const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// --- Paths archivos CSV ---
const PERSONS_PATH = path.join(__dirname, 'persons.csv');
const CLASSROOMS_PATH = path.join(__dirname, 'classrooms.csv');

// --- Funciones genéricas para CSV ---
function parseCSV(data) {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]));
  });
}

function toCSV(data, headers) {
  const lines = data.map(obj =>
    headers.map(h => obj[h] ?? '').join(',')
  );
  return [headers.join(','), ...lines].join('\n');
}

function readFileOrCreate(path, headers) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, headers.join(',') + '\n');
  }
  return fs.readFileSync(path, 'utf8');
}

function writeFile(path, data, headers) {
  fs.writeFileSync(path, toCSV(data, headers), 'utf8');
}

// --- PERSON ROUTER (Nivel 1) ---
const personRouter = express.Router();

personRouter.get('/', (req, res) => {
  const data = parseCSV(readFileOrCreate(PERSONS_PATH, ['Id','Name','Surname','IsTeacher','Birthdate']));
  res.json(data);
});

personRouter.get('/:id', (req, res) => {
  const data = parseCSV(readFileOrCreate(PERSONS_PATH, ['Id','Name','Surname','IsTeacher','Birthdate']));
  const person = data.find(p => p.Id === req.params.id);
  if (person) res.json(person);
  else res.status(404).json({ error: 'Person not found' });
});

personRouter.post('/', (req, res) => {
  const { Name, Surname, IsTeacher, Birthdate } = req.body;
  let data = parseCSV(readFileOrCreate(PERSONS_PATH, ['Id','Name','Surname','IsTeacher','Birthdate']));
  const newId = (Math.max(0, ...data.map(p => parseInt(p.Id))) + 1).toString();
  const newPerson = {
    Id: newId,
    Name,
    Surname,
    IsTeacher: IsTeacher.toString(),
    Birthdate
  };
  data.push(newPerson);
  writeFile(PERSONS_PATH, data, ['Id','Name','Surname','IsTeacher','Birthdate']);
  res.status(201).json(newPerson);
});

personRouter.put('/:id', (req, res) => {
  let data = parseCSV(readFileOrCreate(PERSONS_PATH, ['Id','Name','Surname','IsTeacher','Birthdate']));
  const index = data.findIndex(p => p.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });
  data[index] = {
    ...data[index],
    ...req.body,
    Id: data[index].Id
  };
  writeFile(PERSONS_PATH, data, ['Id','Name','Surname','IsTeacher','Birthdate']);
  res.json(data[index]);
});

personRouter.delete('/:id', (req, res) => {
  let data = parseCSV(readFileOrCreate(PERSONS_PATH, ['Id','Name','Surname','IsTeacher','Birthdate']));
  const index = data.findIndex(p => p.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });
  const deleted = data.splice(index, 1);
  writeFile(PERSONS_PATH, data, ['Id','Name','Surname','IsTeacher','Birthdate']);
  res.json(deleted[0]);
});

// --- CLASSROOM ROUTER (Nivel 2) ---
const classroomRouter = express.Router();

classroomRouter.get('/', (req, res) => {
  const data = parseCSV(readFileOrCreate(CLASSROOMS_PATH, ['Id','Name','Teacher_id','Students']));
  // Convertir Students de string a array
  const parsed = data.map(c => ({
    ...c,
    Students: c.Students ? c.Students.split(';') : []
  }));
  res.json(parsed);
});

classroomRouter.get('/:id', (req, res) => {
  const data = parseCSV(readFileOrCreate(CLASSROOMS_PATH, ['Id','Name','Teacher_id','Students']));
  const classroom = data.find(c => c.Id === req.params.id);
  if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

  classroom.Students = classroom.Students ? classroom.Students.split(';') : [];
  res.json(classroom);
});

classroomRouter.post('/', (req, res) => {
  const { Name, Teacher_id, Students } = req.body; // Students se espera array

  let data = parseCSV(readFileOrCreate(CLASSROOMS_PATH, ['Id','Name','Teacher_id','Students']));
  const newId = (Math.max(0, ...data.map(c => parseInt(c.Id))) + 1).toString();

  const newClassroom = {
    Id: newId,
    Name,
    Teacher_id,
    Students: (Array.isArray(Students) ? Students.join(';') : '')
  };

  data.push(newClassroom);
  writeFile(CLASSROOMS_PATH, data, ['Id','Name','Teacher_id','Students']);
  // Devolver con Students convertido a array
  res.status(201).json({ ...newClassroom, Students: Students || [] });
});

classroomRouter.put('/:id', (req, res) => {
  let data = parseCSV(readFileOrCreate(CLASSROOMS_PATH, ['Id','Name','Teacher_id','Students']));
  const index = data.findIndex(c => c.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Classroom not found' });

  // Construir objeto actualizado
  const updated = {
    ...data[index],
    ...req.body,
    Id: data[index].Id,
    Students: req.body.Students
      ? (Array.isArray(req.body.Students) ? req.body.Students.join(';') : req.body.Students)
      : data[index].Students
  };

  data[index] = updated;
  writeFile(CLASSROOMS_PATH, data, ['Id','Name','Teacher_id','Students']);

  // Devolver Students como array
  const response = { ...updated, Students: updated.Students ? updated.Students.split(';') : [] };
  res.json(response);
});

classroomRouter.delete('/:id', (req, res) => {
  let data = parseCSV(readFileOrCreate(CLASSROOMS_PATH, ['Id','Name','Teacher_id','Students']));
  const index = data.findIndex(c => c.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Classroom not found' });
  const deleted = data.splice(index, 1);
  writeFile(CLASSROOMS_PATH, data, ['Id','Name','Teacher_id','Students']);
  deleted[0].Students = deleted[0].Students ? deleted[0].Students.split(';') : [];
  res.json(deleted[0]);
});

// --- Montar routers ---
app.use('/api/persons', personRouter);
app.use('/api/classrooms', classroomRouter);

// --- Iniciar servidor ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
