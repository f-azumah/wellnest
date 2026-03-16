export default function DisplayDate({className=" ", text = " "}){
    return(
        <p className={`text-gray-800 font-medium font-body ${className}`}>{text}</p>
    )
}