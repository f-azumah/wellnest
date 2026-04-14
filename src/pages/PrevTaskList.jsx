import Navbar from "../components/Navbar";
import DisplayDate from "../components/Date";
import { useEffect, useState } from "react";
import { getPreviousPlan, displayDate } from "../utils/taskManager";

function DisplayPrevTaskList(){
    const [yesterdayPlan, setYesterdayPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        async function fetchPrevPlan() {
            const data = await getPreviousPlan();
            setLoading(false);
            if(data){
                setYesterdayPlan(data);
            }
        }
        fetchPrevPlan();
    }, []);
    if(loading) return <p>Loading...</p>
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
                {!yesterdayPlan ? (
                    <p className="text-gray-400 text-sm">No previous tasks.</p>

                ) : (yesterdayPlan.tasks
                    .filter((task) => task.is_complete === false)
                    .map((subtask, index) => (
                    <div
                        key={`${yesterdayPlan.plan_id}-${index}`}
                        className="border-b border-neutral-200 py-2 text-gray-700"
                    >
                    {subtask.task_name}
                    </div>
                    ))
                )
                }
            </div>


        
        </>

    )
}

export default DisplayPrevTaskList