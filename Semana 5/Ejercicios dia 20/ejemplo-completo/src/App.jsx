import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewTask from './pages/NewTask';
import TaskDetail from './pages/TaskDetail';
import { TaskProvider } from './context/TaskContext';
import './App.css'; 

function App() {
  return (
    <TaskProvider>
      <div className="p-4">
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-500">Inicio</Link>
          <Link to="/new-task" className="text-blue-500">Nueva Tarea</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </div>
    </TaskProvider>
  );
}

export default App;
