// page wrapper/layout

import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { supabase } from "../lib/supabase.js";
import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";


function MyComponent(){
    return (
        <img src="../login.svg" alt="Girl holding flowers" className="w-100 h-auto bg-indigo-100 rounded-xl"></img>
    )

}

function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();
        console.log("form submitted");
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        navigate("/brain-dump");
    }

    return(
        <AuthCard>
            <div className="flex flex-col p-8 rounded-lg w-120 items-center justify-center">
                <h1 className="text-gray-800 text-2xl mb-5 font-heading">Welcome back to <strong className="font-heading text-3xl">Wellnest!</strong></h1>
                <h2 className="text-lg text-gray-600 font-body mb-10"> Stay Consistent. Stay Centered.</h2>
                <form onSubmit={handleSubmit} className = "space-y-4 flex flex-col items-center">
                    <FormInput type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <FormInput type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                    <div className="w-80 text-end mb-0">
                        <Link to="" className="text-indigo-600 hover:text-indigo-800 font-semibold font-serif text-sm hover:underline-offset-1">Forgot password?</Link>
                    </div>

                    <Button className="mt-6 w-[320px] bg-indigo-400 text-white" text={loading ? "Logging in..." : "Login"}></Button>

                </form>

                <hr className=" border-gray-300 my-10 w-80"></hr>

                <p className="mt-4 text-black font-serif">Don't have an account? <Link to="/create-account" className="underline-offset-1 text-indigo-600 font-serif hover:text-indigo-800">Create one now</Link></p>
            </div>

            <div className="p-10">
                <MyComponent />
            </div>
        </AuthCard>
        
    );
}

export default Login;
