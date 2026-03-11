import { formatDate, getTaskHistory } from "../utils/taskManager";
import Navbar from "../components/Navbar";

function DisplayTaskHistory(){
    const tasks = getTaskHistory();
    return(
    <>
        <Navbar />
        <h1 className="font-heading text-3xl font-bold text-gray-800 absolute top-[120px] left-1/2 -translate-x-1/2">Previous Task Lists</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {!tasks.length ? (
                <p className="text-gray-400 text-sm">No previous tasks.</p>
        ) : (
            tasks
            .filter((task) => task.dateCreated != formatDate())
            .map((task) => 
                <div key={task.id} className="flex flex-col w-full border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md h-auto overflow-y-auto p-4">
                    <h3 className="font-heading dark:text-gray-800 mb-3">Tasks for {task.dateCreated}</h3>
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
            )
        )
        }
        </div>
    </>
    )
}

export default DisplayTaskHistory;