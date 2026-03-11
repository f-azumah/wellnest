import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button"

const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
};

//function to parse text
function parseText(text){
    return text
        .split(/[\n,;.]+|\band\b|\bthen\b|\bbut\b|\balso\b|\bor\b/)
        .map(t => t.trim())
        .filter(t => t.length > 0);
}

function BrainDump(){
    const [input, setInput] = useState("")
    const navigate = useNavigate();
    
        // once button is clicked:
        const onButtonClick = () => {
            console.log("button clicked");
            // if there's no input after trimming return
            if(!input.trim()) return;

            // if there's input run it through parseText
            const parsed = parseText(input)
    
            // create a new task object which has a unique id, the user's input and subtasks from parseText output
            const newTask = {
                id: crypto.randomUUID(),
                originalText: input,
                subtasks: parsed
            };
            // grab whatever is in the local storage and save it in existing if theres nothing fall back to empty array
            const existing = JSON.parse(localStorage.getItem("wellnest_tasks") || "[]");
            // add the new task into the existsing array and save it in local storage
            localStorage.setItem("wellnest_tasks", JSON.stringify([...existing, newTask]));
            // navigate to tasklist.jsx
            navigate("/task-list");
        };

    return(
        <>
            <Navbar />
            <div className="flex flex-col h-[450px] mt-25 justify-center">
                <h1 className="font-heading text-3xl font-bold mb-12">Time to offload</h1>
                <div className="flex flex-col items-start border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md">
                    <h2 className="mt-10 font-heading underline pl-10 font-semibold dark:text-gray-800">BRAIN DUMP</h2>
                    <textarea  
                        type="text" 
                        id = "braindump" 
                        name="braindump" 
                        placeholder="Everything in your head, no sorting yet..." 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onInput={autoResize} 
                        className="w-5xl h-auto dark:text-white ">

                    </textarea>
                    <div className="flex mb-5 w-full justify-end-safe">
                        <Button 
                            onClick={onButtonClick} 
                            className = "bg-lime-200 text-gray-600 mr-8" 
                            text="Break It Down"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrainDump;