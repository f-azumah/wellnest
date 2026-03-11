import { useState } from "react";
import Navbar from "../components/Navbar";


function DisplayTasks(){
    const [tasks] = useState(() => {
        const saved = localStorage.getItem("wellnest_tasks");
        return saved ? JSON.parse(saved) : [];
    });
    return(
        <>
            <Navbar />
            <div>
                <h2 className="font-heading font-bold text-2xl mb-15">Let's Break it Down</h2>
                <div className="flex justify-between items-end">
                    <div className="flex flex-col w-[475px] h-[500px] justify-between">
                        <div className="border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md h-96 overflow-y-auto p-4">
                            <h3 className="font-heading dark:text-gray-800 mb-3">Tasks</h3>

                            {tasks.length === 0 ? (
                                <p className="text-gray-400 text-sm">No tasks yet. Go do a brain dump first!</p>
                            ) : (
                                tasks.map(task =>
                                    task.subtasks.map((subtask, index) => (
                                        <div
                                            key={`${task.id}-${index}`}
                                            className="border-b border-neutral-200 py-2 text-gray-700"
                                        >
                                            {subtask}
                                        </div>
                                    ))
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}

export default DisplayTasks;