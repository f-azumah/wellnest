import { supabase } from "../lib/supabase";

function formatDate(){
    const date = new Date();

    // Format as "YYYY-MM-DD"
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;

}

function displayDate(){
    const date = new Date();
    return date.toLocaleDateString("en-US", { 
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
}

function getPrevDate(){
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()-1);

    const day = String(yesterday.getDate()).padStart(2, '0');
    const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = yesterday.getFullYear();

    return `${year}-${month}-${day}`;
    
}

// called when user clicks 'brain dump' button. 
// saves data
async function createActionPlan(tasks) {
    const {data: userData} = await supabase.auth.getUser();
    const userID = userData.user.id;
    const {data: planData, error: planError} = await supabase
        .from('action_plans')
        .insert({date_created: formatDate(), user_id: userID})
        .select('plan_id')
    
    if (planError) {
        console.error(planError.message);
        throw planError;
    }
    
    const planID = planData[0].plan_id
    //Insert parents first (tasks with parent_index === null)
    // Track AI iarray index -> real task_id so we can resolve children later
    const indexToTaskId = new Map();

    const parents = tasks
        .map((t, i) => ({ ...t, originalIndex: i}))
        .filter(t => t.parent_index === null || t.parent_index === undefined);

    if (parents.length > 0) {
        const parentRows = parents.map(t => ({
            plan_id: planID, 
            task_name: t.task_name,
            is_complete: false,
            priority: t.priority ?? 'medium',
            estimated_minutes: t.estimated_minutes ?? null,
            sort_order: t.sort_order ?? 0,
            parent_task_id: null,
        }));

        const { data: insertedParents, error: parentError } = await supabase
        .from('tasks')
        .insert(parentRows)
        .select('task_id')

        if (parentError) {
            console.error(parentError.message);
            throw parentError;
        }

         // Map original AI indices to the new real ID's 
        parents.forEach((p, i) => {
            indexToTaskId.set(p.originalIndex, insertedParents[i].task_id);
        });
    }

    const children = tasks
        .map((t, i) => ({ ...t, originalIndex: i}))
        .filter(t => t.parent_index !== null && t.parent_index !== undefined);

    if (children.length > 0) {
        const childRows = children.map(t => ({
            plan_id: planID, 
            task_name: t.task_name,
            is_complete: false,
            priority: t.priority ?? 'medium',
            estimated_minutes: t.estimated_minutes ?? null,
            sort_order: t.sort_order ?? 0,
            parent_task_id: indexToTaskId.get(t.parent_index) ?? null,
        }));

        const { error: childError } = await supabase
        .from('tasks')
        .insert(childRows)

        if (childError) {
            console.error(childError.message);
            throw childError;
        }
    }
}

// fetch today's action plan and tasks 
async function getTodayPlan() {
    const {data, error} = await supabase
        .from('action_plans')
        .select(`*, tasks(*)`)
        .eq('date_created', formatDate())

    if(error){
        console.error(error.message);
        return;
    }

    return data[0];
}

// fetch yesterday's action plan and tasks
async function getPreviousPlan() {
    const {data, error} = await supabase
        .from('action_plans')
        .select(`*, tasks(*)`)
        .eq('date_created', getPrevDate())

    if(error){
        console.error(error.message);
        return;
    }

    return data[0];
}

// fetch all previous action plans and tasks 
async function getTaskHistory() {
    const {data, error} = await supabase
        .from('action_plans')
        .select(`*, tasks(*)`)
        .neq('date_created', formatDate())

    if(error){
        console.error(error.message);
        return;
    }

    return data;
}

async function updateTask(taskID, updates) {
    const {error} = await supabase
        .from('tasks')
        .update(updates)
        .eq('task_id', taskID)

    if (error){
        console.error(error.message);
        return;
    }
}



    

export {displayDate, createActionPlan, getTodayPlan, getPreviousPlan, getTaskHistory, updateTask}