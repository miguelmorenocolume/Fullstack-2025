import {
  obtenerNombres,
  agregarNombre,
  eliminarNombre
} from '../../models/nombres';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ nombres: obtenerNombres() });
  }

  else if (req.method === 'POST') {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'Falta el nombre' });
    }
    const nuevo = agregarNombre(nombre);
    res.status(201).json(nuevo);
  }

  else if (req.method === 'DELETE') {
    const { id } = req.body;
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    const eliminado = eliminarNombre(idNum);
    if (eliminado) {
      res.status(200).json({ eliminado: true });
    } else {
      res.status(404).json({ error: 'Nombre no encontrado' });
    }
  }

  else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
