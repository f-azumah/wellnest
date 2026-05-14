import "@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You help overwhelmed users turn messy brain dumps into a clear, actionable plan. Your goal is to reduce overwhelm — not to capture every word the user typed.

Given a brain dump (a paragraph of mixed thoughts, feelings, and to-dos), return a JSON object with a "tasks" array. Each task has:

- task_name (string): a clear, concrete action starting with a verb. Max 80 characters.
- priority ("high" | "medium" | "low"): high = has a stated deadline or is blocking other things; low = nice-to-have, no urgency; medium = everything else.
- estimated_minutes (integer): your honest estimate of how long this single action takes. Prefer 5, 15, 30, 60, or 120.
- parent_index (integer | null): if this task is a subtask of another task in the array, the zero-based index of the parent task. Otherwise null.
- sort_order (integer): the recommended order to tackle tasks, starting at 0. Order high-priority and time-sensitive tasks first.

Rules:
1. Filter out venting, emotions, and non-actionable statements. "i feel overwhelmed" is not a task.
2. If a task is large or vague (would take more than 30 minutes, or starts with phrases like "deal with", "figure out", "work on"), break it into 2-4 concrete subtasks. The parent gets the high-level name; each child gets a specific small action and points at the parent via parent_index.
3. Use verb-first phrasing: "Email Professor Smith about extension" not "the email to professor smith."
4. Be honest about scope. Don't pad the list. Don't invent tasks the user didn't imply.
5. Output ONLY valid JSON. No prose, no markdown, no code fences.

Example input: "i'm so behind on my thesis and i still need to call grandma and rent is due friday"

Example output:
{
  "tasks": [
    {"task_name": "Pay rent", "priority": "high", "estimated_minutes": 15, "parent_index": null, "sort_order": 0},
    {"task_name": "Make progress on thesis", "priority": "high", "estimated_minutes": 120, "parent_index": null, "sort_order": 1},
    {"task_name": "Open thesis doc and re-read last paragraph written", "priority": "high", "estimated_minutes": 15, "parent_index": 1, "sort_order": 2},
    {"task_name": "Write 200 words in the next section", "priority": "high", "estimated_minutes": 30, "parent_index": 1, "sort_order": 3},
    {"task_name": "Call grandma", "priority": "medium", "estimated_minutes": 30, "parent_index": null, "sort_order": 4}
  ]
}`;

function buildSystemPrompt(): string {
  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];
  const dayOfWeek = today.toLocaleDateString("en-US", {weekday: "long"});

  return `Today's date is ${todayISO} (${dayOfWeek}). When the user mentions relative dates ("tomorrow, "this Friday", "next week), interpret them relative to this date. Use this to assign priority: high = due within 3 days; medium = due within 2 weeks; low = beyond 2 weeks or no stated deadline.
${SYSTEM_PROMPT}`; 
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { brainDump } = await req.json();

    if (!brainDump || typeof brainDump !== "string" || brainDump.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "brainDump (non-empty string) is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Cheap guardrail: cap the input so a runaway paste doesn't burn tokens.
    if (brainDump.length > 5000) {
      return new Response(
        JSON.stringify({ error: "brainDump is too long (max 5000 characters)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const anthropicResp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: buildSystemPrompt(),
        messages: [
          { role: "user", content: brainDump },
          { role: "assistant", content: "{" }, // Prefill forces JSON-only output.
        ],
      }),
    });

    if (!anthropicResp.ok) {
      const errBody = await anthropicResp.text();
      console.error("Anthropic API error:", anthropicResp.status, errBody);
      return new Response(
        JSON.stringify({ error: "AI service error", status: anthropicResp.status }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await anthropicResp.json();
    const text = data.content?.[0]?.text;

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Empty response from AI" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // We prefilled with "{", so the model's response starts mid-JSON. Prepend it back.
    let parsed;
    try {
      parsed = JSON.parse("{" + text);
    } catch (e) {
      console.error("Failed to parse JSON. Raw text:", text);
      return new Response(
        JSON.stringify({ error: "AI returned invalid JSON" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(parsed.tasks)) {
      return new Response(
        JSON.stringify({ error: "AI response missing tasks array" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ tasks: parsed.tasks }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});