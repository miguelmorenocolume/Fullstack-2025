const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.oqyfvty.mongodb.net/prueba_1");
    console.log("Conectado a MongoDB Atlas con Mongoose");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
