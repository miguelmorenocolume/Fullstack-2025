const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const csvPath = path.resolve(__dirname, '../data/new_persons.csv'); 

async function main() {
  const usuarios = [];

  const parser = fs.createReadStream(csvPath).pipe(parse({ columns: true, trim: true }));

  for await (const row of parser) {
    usuarios.push({
      name: row.name,
      age: parseInt(row.age),
      email: row.email,
      city: row.city,
    });
  }

  for (const usuario of usuarios) {
    try {
      await prisma.usuario.create({ data: usuario });
      console.log(`Insertado: ${usuario.name}`);
    } catch (error) {
      console.error(`Error insertando ${usuario.name}:`, error.message);
    }
  }

  await prisma.$disconnect();
  console.log('Importación completada');
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
