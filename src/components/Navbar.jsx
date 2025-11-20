export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">WellNest</h1>

      <div className="flex gap-4">
        <button className="px-3 py-1 bg-white text-blue-600 rounded">
          Login
        </button>
        <button className="px-3 py-1 bg-white text-blue-600 rounded">
          Sign Up
        </button>
      </div>
    </nav>
  );
}