import { Link } from 'react-router-dom';

function TaskItem({ task, onToggleCompleted, onDelete }) {
  return (
    <li className="border p-4 rounded shadow flex justify-between items-start">
      <div>
        <Link to={`/task/${task.id}`} className="text-xl font-semibold hover:underline">
          {task.titulo}
        </Link>
        <p className="text-gray-600">{task.descripcion}</p>
        <p className={`text-sm ${task.completada ? 'text-green-600' : 'text-yellow-600'}`}>
          {task.completada ? 'Completada' : 'Pendiente'}
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onToggleCompleted(task.id)}
          className="px-2 py-1 text-sm bg-green-200 hover:bg-green-300 rounded"
        >
          {task.completada ? 'Desmarcar' : 'Completar'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-2 py-1 text-sm bg-red-200 hover:bg-red-300 rounded"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
