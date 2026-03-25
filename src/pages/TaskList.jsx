import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getTasks, getLatestTask, formatDate, displayDate } from "../utils/taskManager";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import DisplayDate from "../components/Date";


function DisplayTasks(){
    const navigate = useNavigate();
    const location = useLocation();
    const tasks = getTasks();
    const [completedIndexes, setCompletedIndexes] = useState(
        location.state?.completedIndexes || []
    );
    var latestTask = getLatestTask(tasks);

    const onButtonClick1 = () => {
        navigate("/task-history")
    }

    return(
        <>
                <Navbar />
                <div className="absolute top-[72px] right-4">
                    <DisplayDate className="fade-in" text={displayDate()} />
                </div>
                <h1 className="font-heading font-bold text-3xl text-gray-800 mb-5">Let's Break it Down</h1>
                <h2 className="font-heading font-bold text-2xl text-gray-800 mb-15">Today's Focus :</h2>
                <div className="flex flex-col w-[475px] h-auto justify-between border-solid border-l-3 border-l-indigo-400 border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md h-auto overflow-y-auto p-4">
                    <h3 className="font-heading dark:text-gray-800 mb-3">Tasks</h3>
                    {!latestTask || latestTask.dateCreated != formatDate() ? (
                        <p className="text-gray-400 text-sm">No tasks for today. Go do a <Link to="/brain-dump" className="underline-offset-1 text-indigo-300 hover:text-indigo-400">brain dump</Link> first!<br /> or <br /> <Link to="/prev-task-list" className="underline-offset-1 text-indigo-300 hover:text-indigo-400">Continue yesterday's tasks</Link></p>
                    ) : (
                        latestTask.subtasks.map((subtask, index) => (
                            <>
                                <div
                                    key={`${latestTask.id}-${index}`}
                                    className={`flex justify-center mt-1 cursor-pointer hover:bg-indigo-50 rounded-lg px-2 py-1 transition-colors ${
                                        completedIndexes.includes(index) ? "line-through text-gray-400" : "text-gray-700"}`}
                                    onClick={() => {
                                        if (completedIndexes.includes(index)) {
                                            setCompletedIndexes(prev => prev.filter(i => i !== index));
                                            return;
                                        }
                                        navigate("/focus", { state: { task: subtask.content, index, completedIndexes } });
                                    }}
                                >
                                    {subtask.content}
                                </div>
                                <div className="border-b border-neutral-200 my-1"></div>
                            </>
                            ))
                        )
                    }
                </div>

                <Button 
                    onClick={onButtonClick1}
                    className="w-auto text-gray-800 bg-indigo-300 hover:bg-indigo-400 mt-10 text-white absolute left-1/2 -translate-x-1/2"
                    text="Previous Task Lists"
                /> 
            
        </>

    );

}

export default DisplayTasks;