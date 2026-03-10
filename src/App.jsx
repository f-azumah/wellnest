import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
// import { createClient } from "@supabase/supabase-js";
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import BreakItDown from './pages/BreakItDown.jsx';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path='/break-it-down' element={<BreakItDown />} />
    </Routes>
  );
}


export default App;
