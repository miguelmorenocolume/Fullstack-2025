import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';

function NewTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: uuidv4(),
      titulo: titleRef.current.value,
      descripcion: descriptionRef.current.value,
      completada: false,
    };

    addTask(newTask);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Agregar Nueva Tarea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          ref={titleRef}
          placeholder="Título"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          ref={descriptionRef}
          placeholder="Descripción"
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Agregar Tarea
        </button>
      </form>
    </div>
  );
}

export default NewTask;
