import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button"

const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
};


function getText(){
    const brainDumpContainer = document.getElementById("braindump");
    if(!brainDumpContainer) return "";
    const userInp = brainDumpContainer.value;
    return userInp;
    // console.log(userInp);
}

function parseText(text){
    return text
        .split(/[\n,;.]+|\band\b|\bthen\b|\bbut\b|\balso\b|\bor\b/)
        .map(t => t.trim())
        .filter(t => t.length > 0);
}

function BreakItDown(){
    const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("wellnest_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
    localStorage.setItem("wellnest_tasks", JSON.stringify(tasks));
    }, [tasks]);


    const onButtonClick = () => {
        console.log("button clicked");

        const text = getText();
        if(!text.trim()) return;

        const parsed = parseText(text)

        const newTask = {
            id: crypto.randomUUID(),
            originalText: text,
            subtasks: parsed
        }

        setTasks(prevTasks => [...prevTasks, newTask])
    }
    console.log(tasks);
    return(
        <>
            <Navbar />
            <div className="flex flex-col h-[450px] mt-25 justify-center">
                <h1 className="font-heading text-3xl font-bold mb-12">Time to offload</h1>
                <div className="flex flex-col items-start border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md">
                    <h2 className="mt-10 font-heading underline pl-10 font-semibold dark:text-gray-800">BRAIN DUMP</h2>
                    <textarea  type="text" id = "braindump" name="braindump" placeholder="Everything in your head, no sorting yet..." onInput={autoResize} className="w-5xl h-auto dark:text-white "></textarea>
                    <div className="flex mb-5 w-full justify-end-safe">
                        <Button 
                            onClick={onButtonClick} 
                            className = "bg-lime-200 text-gray-600 mr-8" 
                            text="Break It Down"
                        />
                    </div>
                </div>
            </div>
            <div className={`flex flex-col mt-25 ${tasks.length === 0 ? "hidden" : ""}`}>
                <div>
                    <h2 className="font-heading font-bold text-2xl mb-15">Let's Break it Down</h2>
                </div>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col w-[475px] h-[500px] justify-between">
                        <div className="border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md h-96 overflow-y-auto p-4">
                            <h3 className="font-heading dark:text-gray-800 mb-3">Tasks</h3>

                            {tasks.map(task =>
                                task.subtasks.map((subtask, index) => (
                                    <div
                                        key={`${task.id}-${index}`}
                                        className="border-b border-neutral-200 py-2 text-gray-700"
                                    >
                                        {subtask}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md w-[475px] h-[500px]">
                        <h3 className="font-heading dark:text-gray-800">Thoughts</h3>
                        <div className="flex flex-col h-full">
                            <div className="flex-1">

                            </div>
                            <textarea type="text" id="thought-entry" name="thought-entry" placeholder="Thoughts you don't wanna lose, but don't need to act on" className="mt-2 pl-0"></textarea>
                        </div>
                    </div>  
                </div>
            </div>
        </>

    );

}

export default BreakItDown;