import Navbar from "../components/Navbar";


function Dashhboard(){
    return(
        <>
            <Navbar />
            <div className="flex flex-col items-start mt-15 border-solid border-1 border-neutral-300 rounded-3xl bg-white/65 shadow-md">
                <h1 className="mt-10 font-heading underline pl-10 font-semibold dark:text-gray-800">BRAIN DUMP</h1>
                <textarea  type="text" id = "braindump" name="braindump" placeholder="What's on your mind..." className="w-5xl h-175 dark:text-white ">
                </textarea>
            </div>
        </>

    );

}

export default Dashhboard;