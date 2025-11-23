// page wrapper/layout
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MyComponent(){
    return (
        <img src="../public/login.svg" alt="Girl holding flowers" className="w-100 h-auto border-dashed bg-lime-100 rounded-xl"></img>
    )

}

function Login(){
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("form submitted");
        navigate("/dashboard");
    }

    return(
        <div className="flex shadow-lg">
        <div className="flex flex-col p-8 rounded-lg w-120 items-center justify-center">
            <h1 className="text-lg text-black-600 dark:text-white font-serif mb-10"> Stay Consistent. Stay Centered. Welcome back to <strong>Wellnest!</strong></h1>
            <form onSubmit={handleSubmit} className = "space-y-4 flex flex-col items-center">
                <input type="text" id = "username" name="username" placeholder="Username" className="border-solid border-2 border-gray-200 rounded-3xl w-80 h-10"></input>
                <input type="password" id = "password" name="password" placeholder="Password" className="border-solid border-2 border-gray-200 rounded-3xl w-80 h-10"></input>
                
                <div className="w-80 text-end">
                <p className="font-semibold font-serif text-sm hover:underline-offset-1"><a href="">Forgot password?</a></p>
                </div>

                <Button text="Login"></Button>

            </form>

            <hr className=" border-gray-300 dark:border-gray-600 my-10 w-80"></hr>

            <p className="mt-4 font-serif">Don't have an account? <Link to="/create-account" className="underline-offset-1 text-lime-700 font-serif dark:text-lime-700">Create one now</Link></p>
        </div>

        <div className="p-10">
            <MyComponent />
        </div>


        </div>
        
    );
}

export default Login;
