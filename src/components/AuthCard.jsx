export default function AuthCard({ children }) {
    return (
        <div className="flex shadow-lg border-l-2 border-l-indigo-300 border-t-2 border-t-indigo-300 bg-slate-100 rounded-3xl">
            {children}
        </div>
    );
}