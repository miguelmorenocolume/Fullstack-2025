const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const router = express.Router();

app.use(express.json());

const FILE_PATH = path.join(__dirname, 'persons.csv');

// Helpers para leer y escribir CSV
function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

function toCSV(data) {
  const headers = ['Id', 'Name', 'Surname', 'IsTeacher', 'Birthdate'];
  const lines = data.map(person =>
    headers.map(h => person[h]).join(',')
  );
  return [headers.join(','), ...lines].join('\n');
}

function readFile() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, 'Id,Name,Surname,IsTeacher,Birthdate\n');
  }
  return fs.readFileSync(FILE_PATH, 'utf8');
}

function writeFile(data) {
  fs.writeFileSync(FILE_PATH, toCSV(data), 'utf8');
}

// LISTAR TODOS
router.get('/', (req, res) => {
  const data = parseCSV(readFile());
  res.json(data);
});

// OBTENER UNO POR ID
router.get('/:id', (req, res) => {
  const data = parseCSV(readFile());
  const person = data.find(p => p.Id === req.params.id);
  if (person) res.json(person);
  else res.status(404).json({ error: 'Person not found' });
});

// CREAR NUEVO
router.post('/', (req, res) => {
  const { Name, Surname, IsTeacher, Birthdate } = req.body;
  let data = parseCSV(readFile());

  const newId = (Math.max(0, ...data.map(p => parseInt(p.Id))) + 1).toString();
  const newPerson = {
    Id: newId,
    Name,
    Surname,
    IsTeacher: IsTeacher.toString(),
    Birthdate
  };

  data.push(newPerson);
  writeFile(data);
  res.status(201).json(newPerson);
});

// ACTUALIZAR POR ID
router.put('/:id', (req, res) => {
  let data = parseCSV(readFile());
  const index = data.findIndex(p => p.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });

  data[index] = {
    ...data[index],
    ...req.body,
    Id: data[index].Id // no permitir cambiar el ID
  };

  writeFile(data);
  res.json(data[index]);
});

// BORRAR POR ID
router.delete('/:id', (req, res) => {
  let data = parseCSV(readFile());
  const index = data.findIndex(p => p.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });

  const deleted = data.splice(index, 1);
  writeFile(data);
  res.json(deleted[0]);
});

// Montar router
app.use('/api/persons', router);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
