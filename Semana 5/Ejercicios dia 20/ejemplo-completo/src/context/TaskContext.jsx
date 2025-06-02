import { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskCompleted = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completada: !task.completada } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTaskCompleted }}>
      {children}
    </TaskContext.Provider>
  );
}
