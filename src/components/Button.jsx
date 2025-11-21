import "../styles/components.css"

export default function Button({text = " ", className = "bg-lime-200 text-lg text-gray-600 mt-8 flex justify-center items-center" }){

    return(
        <button className={className}>
            {text}
        </button>
    )

}