import "../styles/components.css"

export default function Button({onClick, text = " ", className = " "}){

    return(
        <button onClick={onClick} className={`text-lg flex justify-center items-center font-body ${className}`}>
            {text}
        </button>
    )
}