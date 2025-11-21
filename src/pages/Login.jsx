// page wrapper/layout
import Button from "../components/Button";

function MyComponent(){
    return (
        <img src="../public/login.svg" alt="Girl holding flowers" className="w-100 h-auto border-dashed bg-lime-100 rounded-xl"></img>
    )

}

function Login(){
    function handleSubmit(e) {
        e.preventDefault();
        console.log("form submitted");
    }

    return(
        <div className="flex shadow-lg">
        <div className="flex flex-col p-8 rounded-lg w-120 items-center justify-center">
            <h1 className="text-lg text-black-600 dark:text-white mb-10"> Stay Consistent. Stay Centered. Welcome back to <strong>Wellnest!</strong></h1>
            <form onSubmit={handleSubmit} className = "space-y-4 flex flex-col items-center">
                <input type="text" id = "uUsername" name="username" placeholder="username" className="border-solid border-2 border-gray-200 rounded-3xl w-80 h-10"></input>
                <input type="password" id = "password" name="password" placeholder="password" className="border-solid border-2 border-gray-200 rounded-3xl w-80 h-10"></input>
                
                <div className="w-80 text-end">
                <p className="font-semibold text-sm hover:underline-offset-1"><a href="">Forgot password?</a></p>
                </div>

                <Button text="Login"></Button>

            </form>

            <hr className=" border-gray-300 dark:border-gray-600 my-10 w-80"></hr>

            <p className="mt-4">Not a member? <a href="" className="underline-offset-1 text-lime-700 dark:text-lime-700">Register now</a></p>
        </div>

        <div className="p-10">
            <MyComponent />
        </div>


        </div>
        
    );
}

export default Login;
