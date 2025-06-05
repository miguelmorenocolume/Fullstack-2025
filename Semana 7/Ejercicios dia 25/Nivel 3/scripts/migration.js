const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const connectDB = require('../connections/db'); 

// Define un esquema genérico para la colección persons (puedes modificar campos)
const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  email: String,
  city: String
});

const Person = mongoose.model('Person', personSchema);

async function migrateCSVtoMongo(csvFilePath) {
  await connectDB(); // Conectar a MongoDB Atlas

  const records = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convierte tipos donde sea necesario
        data.id = Number(data.id);
        data.age = Number(data.age);
        records.push(data);
      })
      .on('end', async () => {
        try {
          if (records.length > 0) {
            const result = await Person.insertMany(records);
            console.log(`Insertados ${result.length} documentos en la colección persons`);
          } else {
            console.log('No se encontraron registros en el CSV');
          }
          mongoose.connection.close();
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
}

// Ejecutar migración
migrateCSVtoMongo('../data/persons.csv')
  .then(() => console.log('Migración completada'))
  .catch(err => console.error('Error durante migración:', err));
