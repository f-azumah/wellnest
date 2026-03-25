import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import DisplayTasks from './pages/TaskList.jsx';
import BrainDump from './pages/BrainDump.jsx';
import DisplayTaskHistory from './pages/TaskHistory.jsx';
import DisplayPrevTaskList from './pages/PrevTaskList.jsx';
import Focus from './pages/Focus.jsx';



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/brain-dump" element={<BrainDump />} />
        <Route path="/task-list" element={<DisplayTasks />} />
        <Route path="/task-history" element={<DisplayTaskHistory />} />
        <Route path="/prev-task-list" element={<DisplayPrevTaskList />} />
        <Route path="/focus" element={<Focus />} />
      </Routes>
    </>
  );
}


export default App;
