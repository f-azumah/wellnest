export default function FormInput({ type = "text", id, name, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border-solid border-2 border-gray-500 text-gray-600 rounded-3xl w-80 h-10 font-body px-4"
        />
    );
}