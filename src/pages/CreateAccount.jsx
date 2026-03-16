import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function CreateAccount(){
    function handleSubmit(e){
            e.preventDefault();
            console.log("Form Submitted");
        }

    return(
        <AuthCard>
            <div className="flex flex-col p-8 rounded-lg w-120 h-140 items-center justify-center">
                <h1 className="text-2xl text-gray-600 font-serif self-start mb-10 pl-13 ">Create An Account</h1>
                <form onSubmit={handleSubmit} className = "space-y-4 flex flex-col items-center">
                    <div className="relative w-80">
                        <FormInput type="text" id="fname" name="fname" placeholder="Username" />
                        {/* <span className="material-symbols-outlined">person</span> */}
                    </div>
                    <FormInput type="text" id="email" name="email" placeholder="Email" />
                    <FormInput type="password" id="password" name="password" placeholder="Password" />
            
                    <Button className="mt-6 bg-indigo-400 text-white" text="Sign Up"></Button>
            
                </form>
                <hr className=" border-gray-300 my-10 w-80"></hr>

            <p className="mt-4 font-serif text-black">Already have an account? <Link to="/login" className="underline-offset-1 text-indigo-600 font-serif hover:text-indigo-800">Login</Link></p>
            </div>
        </AuthCard>
        
    );



}

export default CreateAccount;
