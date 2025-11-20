import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-heading text-gray-700 font-bold">
          Tailwind is working + Folder structure is set!
        </h1>
        <p className="text-primary font-body">
          Welcome to your WellNest project.
        </p>
      </div>
    </div>
  );
}

export default App
