import "../styles/components.css"

export default function Button({onClick, text = " ", className = " ", disabled = false}){

    return(
        <button onClick={onClick} disabled={disabled} className={`text-lg flex justify-center items-center font-body ${className}`}>
            {text}
        </button>
    )
}