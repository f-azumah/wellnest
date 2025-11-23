import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-screen bg-white dark:text-gray-800 p-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold font-heading text-xl">WellNest</h1>
      <span className="material-symbols-outlined cursor-pointer" onClick={()=>setOpen(!open)}>menu</span>
    </nav>
  );
}