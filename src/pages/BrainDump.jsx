import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Button from "../components/Button"
import { setTasks, createTask } from "../utils/taskManager";

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

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
}


function BrainDump(){
    const [input, setInput] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser(){
            const { data, error } = await supabase.auth.getUser();

            if (error) {
                console.error(error.message);
                return;
            }

            // if (!data?.user) {
            //     navigate("/login");
            //     return;
            // }

            if (data?.user){
                setName(data.user.user_metadata.name);
            }
        }

        getUser();
    }, []);
    
        // once button is clicked:
    const onButtonClick = () => {
        console.log("button clicked");
        // if there's no input after trimming return
        if(!input.trim()) return;

        // if there's input run it through parseText
        const parsed = parseText(input);
        //create new task
        const newTask = createTask(parsed);
        // update tasks array
        setTasks(newTask);

        // navigate to tasklist.jsx
        navigate("/task-list");
    };

    return(
        <>
            <Navbar />
            <h1 className="font-heading text-3xl mb-5 font-bold text-gray-800 fade-in">{getGreeting()}, {name}</h1>
            <h2 className="font-heading font-bold text-2xl text-gray-800 fade-in" style={{animationDelay:"0.1s"}}>Let's unload your thoughts</h2>
            <div className="flex flex-col h-[350px] justify-center fade-out" style={{animationDelay : "0.3s"}}>
                <div className="flex flex-col items-start border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md">
                    <h2 className="mt-10 font-heading underline pl-10 font-semibold text-gray-800">BRAIN DUMP</h2>
                    <textarea  
                        type="text" 
                        id = "braindump" 
                        name="braindump" 
                        placeholder="Dump everything here..." 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onInput={autoResize} 
                        className="w-3xl h-auto text-gray-800">

                    </textarea>
                    <div className="flex mb-5 w-full justify-end-safe">
                        <Button 
                            onClick={onButtonClick} 
                            className = "bg-indigo-300 text-white mr-8 hover:bg-indigo-400" 
                            text="Break It Down"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BrainDump;