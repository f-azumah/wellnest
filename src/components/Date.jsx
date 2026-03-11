export default function DisplayDate({className="text-gray-800 font-medium font-body fade-in", text = " "}){
    return(
        <p className={className}>{text}</p>
    )
}