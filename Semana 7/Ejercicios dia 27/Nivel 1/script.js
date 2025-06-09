import { MongoClient } from "mongodb";

async function run() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("tuBaseDeDatos");
        const alumnos = db.collection("alumnos");

        const resultadoEdad = await alumnos.find({
            edad: { $gte: 18, $lte: 25 }
        }).toArray();
        console.log("Alumnos con edad entre 18 y 25:", resultadoEdad);
        const listaApellidos = ["González", "Garcia", "Gomez"];
        const resultadoApellidos = await alumnos.find({
            apellido: { $in: listaApellidos }
        }).toArray();
        console.log("Alumnos con apellidos en la lista:", resultadoApellidos);

        const resultadoRegex = await alumnos.find({
            apellido: { $regex: "^G", $options: "i" }
        }).toArray();
        console.log('Alumnos cuyo apellido empieza por "G":', resultadoRegex);

    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

run();
