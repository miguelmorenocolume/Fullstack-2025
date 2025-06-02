const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const PERSONS_PATH = path.join(__dirname, 'persons.csv');
const CLASSROOMS_PATH = path.join(__dirname, 'classrooms.csv');

// --- Funciones CSV ---
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

// --- Helpers ---
function getAllPersons() {
  return parseCSV(readFileOrCreate(PERSONS_PATH, ['Id','Name','Surname','IsTeacher','Birthdate']));
}

function getAllClassrooms() {
  const data = parseCSV(readFileOrCreate(CLASSROOMS_PATH, ['Id','Name','Teacher_id','Students']));
  return data.map(c => ({
    ...c,
    Students: c.Students ? c.Students.split(';') : []
  }));
}

// --- ROUTER PERSONS ---
const personRouter = express.Router();

personRouter.get('/', (req, res) => {
  let data = getAllPersons();
  const { name, surname } = req.query;

  if (name) data = data.filter(p => p.Name.toLowerCase().includes(name.toLowerCase()));
  if (surname) data = data.filter(p => p.Surname.toLowerCase().includes(surname.toLowerCase()));

  res.json(data);
});

personRouter.get('/:id', (req, res) => {
  const data = getAllPersons();
  const person = data.find(p => p.Id === req.params.id);
  if (person) res.json(person);
  else res.status(404).json({ error: 'Person not found' });
});

personRouter.post('/', (req, res) => {
  const { Name, Surname, IsTeacher, Birthdate } = req.body;
  let data = getAllPersons();
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
  let data = getAllPersons();
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
  let data = getAllPersons();
  const index = data.findIndex(p => p.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person not found' });
  const deleted = data.splice(index, 1);
  writeFile(PERSONS_PATH, data, ['Id','Name','Surname','IsTeacher','Birthdate']);
  res.json(deleted[0]);
});

// --- ROUTER CLASSROOMS ---
const classroomRouter = express.Router();

classroomRouter.get('/', (req, res) => {
  let data = getAllClassrooms();
  const { name, teacher } = req.query;

  if (name) data = data.filter(c => c.Name.toLowerCase().includes(name.toLowerCase()));
  if (teacher) {
    const persons = getAllPersons();
    const teacherMatch = persons.filter(p => p.Name.toLowerCase().includes(teacher.toLowerCase())).map(p => p.Id);
    data = data.filter(c => teacherMatch.includes(c.Teacher_id));
  }

  res.json(data);
});

classroomRouter.get('/:id', (req, res) => {
  const data = getAllClassrooms();
  const classroom = data.find(c => c.Id === req.params.id);
  if (!classroom) return res.status(404).json({ error: 'Classroom not found' });
  res.json(classroom);
});

classroomRouter.post('/', (req, res) => {
  const { Name, Teacher_id, Students } = req.body;
  let data = getAllClassrooms();
  const newId = (Math.max(0, ...data.map(c => parseInt(c.Id))) + 1).toString();

  const newClassroom = {
    Id: newId,
    Name,
    Teacher_id,
    Students: (Array.isArray(Students) ? Students.join(';') : '')
  };

  data.push({
    ...newClassroom,
    Students: newClassroom.Students.split(';')
  });
  writeFile(CLASSROOMS_PATH, data, ['Id','Name','Teacher_id','Students']);
  res.status(201).json({ ...newClassroom, Students });
});

classroomRouter.put('/:id', (req, res) => {
  let data = getAllClassrooms();
  const index = data.findIndex(c => c.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Classroom not found' });

  const updated = {
    ...data[index],
    ...req.body,
    Id: data[index].Id,
    Students: req.body.Students
      ? (Array.isArray(req.body.Students) ? req.body.Students.join(';') : req.body.Students)
      : data[index].Students.join(';')
  };

  data[index] = { ...updated, Students: updated.Students.split(';') };
  writeFile(CLASSROOMS_PATH, data, ['Id','Name','Teacher_id','Students']);

  res.json({ ...updated, Students: updated.Students.split(';') });
});

classroomRouter.delete('/:id', (req, res) => {
  let data = getAllClassrooms();
  const index = data.findIndex(c => c.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Classroom not found' });
  const deleted = data.splice(index, 1);
  writeFile(CLASSROOMS_PATH, data, ['Id','Name','Teacher_id','Students']);
  res.json(deleted[0]);
});

// --- FULL CLASSROOM DETAIL ---
classroomRouter.get('/full/:id', (req, res) => {
  const persons = getAllPersons();
  const classrooms = getAllClassrooms();
  const classroom = classrooms.find(c => c.Id === req.params.id);
  if (!classroom) return res.status(404).json({ error: 'Classroom not found' });

  const teacher = persons.find(p => p.Id === classroom.Teacher_id) || null;
  const students = classroom.Students.map(id => persons.find(p => p.Id === id)).filter(Boolean);

  res.json({
    ...classroom,
    Teacher: teacher,
    Students: students
  });
});

// --- FULL LIST CLASSROOMS WITH DATA ---
classroomRouter.get('/full', (req, res) => {
  let classrooms = getAllClassrooms();
  const persons = getAllPersons();
  const { name, teacher } = req.query;

  if (name) classrooms = classrooms.filter(c => c.Name.toLowerCase().includes(name.toLowerCase()));
  if (teacher) {
    const teacherMatches = persons.filter(p => p.Name.toLowerCase().includes(teacher.toLowerCase())).map(p => p.Id);
    classrooms = classrooms.filter(c => teacherMatches.includes(c.Teacher_id));
  }

  const result = classrooms.map(c => ({
    ...c,
    Teacher: persons.find(p => p.Id === c.Teacher_id) || null,
    Students: c.Students.map(id => persons.find(p => p.Id === id)).filter(Boolean)
  }));

  res.json(result);
});

// --- MONTAR RUTAS ---
app.use('/api/persons', personRouter);
app.use('/api/classrooms', classroomRouter);

// --- INICIAR SERVIDOR ---
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
