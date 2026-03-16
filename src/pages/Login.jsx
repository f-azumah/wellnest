// page wrapper/layout

import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MyComponent(){
    return (
        <img src="../login.svg" alt="Girl holding flowers" className="w-100 h-auto bg-indigo-100 rounded-xl"></img>
    )

}

function Login(){
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("form submitted");
        navigate("/brain-dump");
    }

    return(
        <AuthCard>
            <div className="flex flex-col p-8 rounded-lg w-120 items-center justify-center">
                <h1 className="text-gray-800 text-2xl mb-5 font-heading">Welcome back to <strong className="font-heading text-3xl">Wellnest!</strong></h1>
                <h2 className="text-lg text-gray-600 font-body mb-10"> Stay Consistent. Stay Centered.</h2>
                <form onSubmit={handleSubmit} className = "space-y-4 flex flex-col items-center">
                    <FormInput type="text" id="username" name="username" placeholder="Username" />
                    <FormInput type="password" id="password" name="password" placeholder="Password" />
                    
                    <div className="w-80 text-end mb-0">
                        <Link to="" className="text-indigo-600 hover:text-indigo-800 font-semibold font-serif text-sm hover:underline-offset-1">Forgot password?</Link>
                    </div>

                    <Button className="mt-6 w-[320px] bg-indigo-400 text-white" text="Login"></Button>

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
