import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

function Home() {
  const { tasks, deleteTask, toggleTaskCompleted } = useTasks();
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completada;
    if (filter === 'pending') return !task.completada;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Lista de Tareas</h2>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          Pendientes
        </button>
      </div>

      <ul className="space-y-4">
        {filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleCompleted={toggleTaskCompleted}
            onDelete={deleteTask}
          />
        ))}
      </ul>

      {filteredTasks.length === 0 && (
        <p className="text-gray-500 mt-4">No hay tareas que coincidan con este filtro.</p>
      )}
    </div>
  );
}

export default Home;
