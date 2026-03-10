import "../styles/components.css"

export default function Button({onClick, text = " ", className = " "}){

    return(
        <button onClick={onClick} className={`text-lg flex justify-center items-center font-sans ${className}`}>
            {text}
        </button>
    )
}