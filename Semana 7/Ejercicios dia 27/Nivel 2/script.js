// paginacionOrdenamiento.js
import { MongoClient } from "mongodb";

async function run() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("tuBaseDeDatos");
    const alumnos = db.collection("alumnos");

    // Primeros 10 registros, ordenados por birthdate DESC y apellido ASC
    const pagina1 = await alumnos.find({})
      .sort({ birthdate: -1, surname: 1 }) 
      .limit(10)
      .toArray();
    console.log("Página 1:", pagina1);

    // Salta los primeros 10 y obtiene los siguientes 10 con el mismo orden
    const pagina2 = await alumnos.find({})
      .sort({ birthdate: -1, surname: 1 })
      .skip(10)
      .limit(10)
      .toArray();
    console.log("Página 2:", pagina2);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
