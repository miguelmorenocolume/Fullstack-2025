let nombres = []; // Se guarda en memoria

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { nombre } = req.body;
    if (nombre) {
      nombres.push(nombre);
      res.status(200).json({ recibido: true });
    } else {
      res.status(400).json({ error: 'Falta el nombre' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ nombres });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
