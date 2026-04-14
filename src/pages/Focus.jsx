import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { updateTask } from "../utils/taskManager";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function Focus(){
    const location = useLocation();
    const navigate = useNavigate();
    const task = location.state?.task || "No task selected";

    const [remaining, setRemaining] = useState(FOCUS_TIME);
    const [totalTime, setTotalTime] = useState(FOCUS_TIME);
    const [paused, setPaused] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (paused) return;

        intervalRef.current = setInterval(() => {
            setRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [paused, onBreak]);

    const fmt = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    const progress = (remaining / totalTime) * 100;

    const togglePause = () => setPaused(prev => !prev);

    const addTime = () => {
        setRemaining(prev => prev + 5 * 60);
        setTotalTime(prev => prev + 5 * 60);
    };

    const startBreak = () => {
        clearInterval(intervalRef.current);
        setOnBreak(true);
        setRemaining(BREAK_TIME);
        setTotalTime(BREAK_TIME);
        setPaused(false);
    };

    const noTask = !location.state?.task;

    const finishEarly = async() => {
        clearInterval(intervalRef.current);
        if(noTask){
            navigate("/task-list");
            return;
        }
        await updateTask(location.state.taskID, {is_complete: true})
        navigate("/task-list");
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">

            <p className="text-xs text-gray-400 tracking-widest uppercase">
                {onBreak ? "On a break" : "Now focusing on"}
            </p>

            <p className="text-3xl font-heading font-bold text-gray-800 text-center max-w-lg">
                {capitalize(task)}
            </p>

            <p className="text-7xl font-heading font-bold text-gray-800 tabular-nums">
                {fmt(remaining)}
            </p>

            {/* progress bar */}
            <div className="w-72 h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: onBreak ? "#6ee7b7" : progress > 30 ? "#a78bfa" : "#f59e0b"
                    }}
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={togglePause}
                    className="px-6 py-2 rounded-xl border border-neutral-300 bg-white text-gray-700 hover:bg-neutral-50 transition"
                >
                    {paused ? "Resume" : "Pause"}
                </button>

                {!onBreak && (
                    <>
                        <button
                            onClick={addTime}
                            className="px-6 py-2 rounded-xl border border-neutral-300 bg-white text-gray-700 hover:bg-neutral-50 transition"
                        >
                            + 5 min
                        </button>
                        <button
                            onClick={startBreak}
                            className="px-6 py-2 rounded-xl border border-neutral-300 bg-white text-gray-500 hover:bg-neutral-50 transition"
                        >
                            Take a break
                        </button>
                    </>
                )}
            </div>

            <button
                onClick={finishEarly}
                className="text-sm text-gray-400 underline underline-offset-2 hover:text-gray-600 transition"
            >
                {noTask ? "Select Task" : "Done early"}
            </button>
        </div>
    );
}

export default Focus;