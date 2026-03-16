import { getPreviousTask, displayDate } from "../utils/taskManager";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/Date";

function DisplayPrevTaskList(){
    const task = getPreviousTask()[0];
    if (!task) return <p>No previous tasks.</p>;

    return(
        <>
            <Navbar />
            <div className="absolute top-[72px] right-4">
                <DisplayDate text={displayDate()} />
            </div>
            <h1 className="font-heading font-bold text-3xl text-gray-800 mb-5">Yesterday's Focus</h1>
            <h2 className="font-heading font-bold text-2xl text-gray-800 mb-15">Here are your incomplete tasks :</h2>
            <div className="flex flex-col w-[475px] h-auto justify-between border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md h-auto overflow-y-auto p-4">
                <h3 className="font-heading dark:text-gray-800 mb-3">Tasks</h3>
                {task.subtasks.map((subtask, index) => (
                    <div
                        key={`${task.id}-${index}`}
                        className="border-b border-neutral-200 py-2 text-gray-700"
                    >
                    {subtask.content}
                    </div>
                    ))
                }
            </div>


        
        </>

    )
}

export default DisplayPrevTaskList