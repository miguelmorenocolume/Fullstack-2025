import dbConnect from '../../lib/db';
import Item from '../../models/Item';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const items = await Item.find();
      return res.status(200).json(items);
    } catch (err) {
      return res.status(500).json({ error: 'Error al obtener los items' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
      }

      const newItem = await Item.create({ name });
      return res.status(201).json(newItem);
    } catch (err) {
      return res.status(500).json({ error: 'Error al crear el item' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Método ${req.method} no permitido`);
}
