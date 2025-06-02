const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, text: "Elemento 1" },
  { id: 2, text: "Elemento 2" },
];

// GET /items - listar todos
app.get("/items", (req, res) => {
  res.json(items);
});

// POST /items - crear nuevo
app.post("/items", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Texto requerido" });

  const newItem = {
    id: Date.now(),
    text,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT /items/:id - actualizar por ID
app.put("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Texto requerido" });

  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex === -1)
    return res.status(404).json({ error: "Elemento no encontrado" });

  items[itemIndex].text = text;
  res.json(items[itemIndex]);
});

// DELETE /items/:id - eliminar por ID
app.delete("/items/:id", (req, res) => {
  const id = Number(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === id);
  if (itemIndex === -1)
    return res.status(404).json({ error: "Elemento no encontrado" });

  const deleted = items.splice(itemIndex, 1);
  res.json(deleted[0]);
});

// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
