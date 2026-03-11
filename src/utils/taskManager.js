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

export default getTasks; setTasks;
