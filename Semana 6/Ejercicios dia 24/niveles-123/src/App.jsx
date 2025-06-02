import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'


const API_URL = "http://localhost:4000/items";

export default function App() {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Cargar lista al montar componente
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (error) {
      console.error("Error al cargar items:", error);
    }
  };

  // Crear nuevo elemento
  const addItem = async () => {
    if (newText.trim() === "") return;
    try {
      const res = await axios.post(API_URL, { text: newText });
      setItems([...items, res.data]);
      setNewText("");
    } catch (error) {
      console.error("Error al agregar item:", error);
    }
  };

  // Iniciar edición
  const startEditing = (item) => {
    setEditingId(item.id);
    setEditingText(item.text);
  };

  // Guardar edición
  const saveEdit = async () => {
    try {
      const res = await axios.put(`${API_URL}/${editingId}`, { text: editingText });
      setItems(items.map(item => item.id === editingId ? res.data : item));
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error al actualizar item:", error);
    }
  };

  // Cancelar edición
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Eliminar elemento
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar item:", error);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: "auto" }}>
      <h2>Lista de Elementos</h2>

      <input
        type="text"
        placeholder="Nuevo elemento"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <button onClick={addItem}>Agregar</button>

      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginTop: 10 }}>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveEdit}>Guardar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                {item.text}
                <button style={{ marginLeft: 10 }} onClick={() => startEditing(item)}>
                  Editar
                </button>
                <button style={{ marginLeft: 10 }} onClick={() => deleteItem(item.id)}>
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}