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
    const {data, error} = await supabase
        .from('action_plans')
        .insert({date_created: formatDate(), user_id: userID})
        .select('plan_id')
    
    if (error) {
        console.error(error.message);
        return;
    }

    
    const planID = data[0].plan_id
    const taskObjects = tasks.map((task => ({
    plan_id : planID,
    task_name : task,
    is_complete : false})
    ))
    const {error: taskError} = await supabase
        .from('tasks')
        .insert(taskObjects)

    if (taskError) {
        console.error(taskError.message);
        return;
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