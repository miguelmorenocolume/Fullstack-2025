// nivel3_condiciones_indices.js
import { MongoClient } from "mongodb";

async function run() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("tuBaseDeDatos");
        const alumnos = db.collection("alumnos");

        // 1. Alumnos que sean profesores y nacieron después del año 2000
        const consulta1 = {
            $and: [
                { esProfesor: true },
                { birthdate: { $gt: new Date("2000-01-01") } }
            ]
        };
        const resultado1 = await alumnos.find(consulta1).toArray();
        console.log("Profesores nacidos después del 2000:", resultado1);

        // 2. Alumnos con nombre "Juan" o apellido "Gómez"
        const consulta2 = {
            $or: [
                { nombre: "Juan" },
                { apellido: "Gómez" }
            ]
        };
        const resultado2 = await alumnos.find(consulta2).toArray();
        console.log('Alumnos con nombre "Juan" o apellido "Gómez":', resultado2);

        // --- índices ---

        // Índice en campo email para acelerar búsquedas por email
        await alumnos.createIndex({ email: 1 });
        console.log("Índice creado en el campo email.");

        // Índice en birthdate para acelerar ordenamientos o consultas por fecha
        await alumnos.createIndex({ birthdate: 1 });
        console.log("Índice creado en el campo birthdate.");

        // --- Usar explain para analizar impacto de índices ---

        const explainEmail = await alumnos.find({ email: "juan@example.com" })
            .explain("executionStats");
        console.log("Explain para consulta por email:", JSON.stringify(explainEmail, null, 2));

        const explainBirthdate = await alumnos.find({ birthdate: { $gt: new Date("2000-01-01") } })
            .explain("executionStats");
        console.log("Explain para consulta por birthdate:", JSON.stringify(explainBirthdate, null, 2));

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

run();
