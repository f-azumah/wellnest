import { getTaskHistory } from "../utils/taskManager";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function DisplayTaskHistory(){
    const [previousPlans, setPreviousPlans] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchPlan() {
            const data = await getTaskHistory();
            setLoading(false);
            if(data){
                setPreviousPlans(data);
            }
        }
        fetchPlan();
    }, []);
    if(loading) return <p>Loading...</p>
    return(
    <>
        <Navbar />
        <div className="flex flex-col align-center justify-center">
            <h1 className="font-heading text-3xl font-bold text-gray-800 mb-5">Previous Task Lists</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {!previousPlans ? (
                        <p className="text-gray-400 text-sm">No previous tasks.</p>
                ) : (
                    previousPlans
                    .map((plan) => 
                        <div key={plan.plan_id} className="flex flex-col w-full border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md h-auto overflow-y-auto p-4">
                            <h3 className="font-heading dark:text-gray-800 mb-3">Tasks for {plan.date_created}</h3>
                                {plan.tasks.map((subtask, index) => (
                                        <div
                                            key={`${plan.plan_id}-${index}`}
                                            className="border-b border-neutral-200 py-2 text-gray-700"
                                        >
                                        {subtask.task_name}
                                        </div>
                                        ))
                                }
                        </div>
                    )
                )
                }
            </div>
        </div>
    </>
    )
}

export default DisplayTaskHistory;