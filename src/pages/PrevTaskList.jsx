import { getPreviousTask } from "../utils/taskManager";
import Navbar from "../components/Navbar";

function DisplayPrevTaskList(){
    const task = getPreviousTask()[0];

    return(
        <>
            <Navbar />
            <div className="flex flex-col w-[475px] h-auto justify-between border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md h-auto overflow-y-auto p-4">
                <h3 className="font-heading dark:text-gray-800 mb-3">Tasks</h3>
                {task.subtasks.map((subtask, index) => (
                    <div
                        key={`${task.id}-${index}`}
                        className="border-b border-neutral-200 py-2 text-gray-700"
                    >
                    {subtask}
                    </div>
                    ))
                }
            </div>


        
        </>

    )
}

export default DisplayPrevTaskList