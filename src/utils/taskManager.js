function getTasks(){
    const saved = localStorage.getItem("wellnest_tasks");
    return saved ? JSON.parse(saved) : []; 
}

function setTasks(task){
    // grab whatever is in the local storage and save it in existing if theres nothing fall back to empty array
    const existing = JSON.parse(localStorage.getItem("wellnest_tasks") || "[]");
    // add the new task into the existsing array and save it in local storage
    localStorage.setItem("wellnest_tasks", JSON.stringify([...existing, task]));
}

function getLatestTask(tasks){
    if(!tasks.length) return null;
    return tasks[tasks.length - 1];
}

function formatDate(){
    const date = new Date();

    // Format as "DD-MM-YYYY"
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;

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

    return `${day}-${month}-${year}`;
    
}

// create a new task object which has a unique id, the date of input and subtasks from parseText output
function createTask(parsed){
    const subtasks = parsed.map((task) => {
        return {
            content : task ,
            completed : false
        }
    })
    return {
        id : crypto.randomUUID(),
        dateCreated : formatDate(),
        subtasks : subtasks
    };
}

function getTaskHistory(){
    const tasks = getTasks();
    return tasks.filter(task => task.dateCreated != formatDate());
}


function getPreviousTask(){
    const tasks = getTasks();
    return tasks.filter(task => task.dateCreated == getPrevDate());

}

export { getTasks, setTasks, getLatestTask, createTask, getTaskHistory, formatDate, displayDate, getPreviousTask };
