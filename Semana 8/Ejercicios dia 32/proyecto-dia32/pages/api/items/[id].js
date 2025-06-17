import dbConnect from '../../../lib/db';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name } = req.body;
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
      }

      const updated = await Item.findByIdAndUpdate(id, { name }, { new: true });

      if (!updated) return res.status(404).json({ error: 'Item no encontrado' });
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ error: 'Error al actualizar el item' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deleted = await Item.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: 'Item no encontrado' });

      return res.status(200).json({ message: 'Item eliminado' });
    } catch (err) {
      return res.status(500).json({ error: 'Error al eliminar el item' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Método ${req.method} no permitido`);
}
