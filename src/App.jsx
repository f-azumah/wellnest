// import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  );
}


export default App;
