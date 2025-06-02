import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskDetail() {
  const { id } = useParams();
  const { tasks, toggleTaskCompleted, deleteTask } = useTasks();
  const navigate = useNavigate();

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <div className="max-w-md mx-auto p-4">
        <p className="text-red-500">Tarea no encontrada.</p>
        <Link to="/" className="text-blue-500 hover:underline">Volver a la lista</Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteTask(id);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{task.titulo}</h2>
      <p className="mb-4">{task.descripcion}</p>
      <p className={`mb-4 font-semibold ${task.completada ? 'text-green-600' : 'text-yellow-600'}`}>
        Estado: {task.completada ? 'Completada' : 'Pendiente'}
      </p>
      <div className="space-x-2">
        <button
          onClick={() => toggleTaskCompleted(id)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {task.completada ? 'Marcar como pendiente' : 'Marcar como completada'}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Eliminar tarea
        </button>
      </div>
      <Link to="/" className="inline-block mt-4 text-blue-500 hover:underline">
        Volver a la lista
      </Link>
    </div>
  );
}

export default TaskDetail;
