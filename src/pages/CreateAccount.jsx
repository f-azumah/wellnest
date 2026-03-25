import AuthCard from "../components/AuthCard";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function CreateAccount(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handleSubmit(e){
            e.preventDefault();
            setLoading(true);
            setError("");

            const {error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name
                    }
                }
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            navigate("/login");
        }

    return(
        <AuthCard>
            <div className="flex flex-col p-8 rounded-lg w-120 h-140 items-center justify-center">
                <h1 className="text-2xl text-gray-600 font-serif self-start mb-10 pl-13 ">Create An Account</h1>
                <form onSubmit={handleSubmit} className = "space-y-4 flex flex-col items-center">
                    <div className="relative w-80">
                        <FormInput type="text" id="name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        {/* <span className="material-symbols-outlined">person</span> */}
                    </div>
                    <FormInput type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <FormInput type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            
                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <Button className="mt-6 bg-indigo-400 text-white" text={loading ? "Creating account..." : "Sign Up"}></Button>
            
                </form>
                <hr className=" border-gray-300 my-10 w-80"></hr>

            <p className="mt-4 font-serif text-black">Already have an account? <Link to="/login" className="underline-offset-1 text-indigo-600 font-serif hover:text-indigo-800">Login</Link></p>
            </div>
        </AuthCard>
        
    );



}

export default CreateAccount;
