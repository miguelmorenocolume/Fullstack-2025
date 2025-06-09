const Producto = require('../models/Producto');

// GET /productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

// GET /productos/:id
const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
};

// POST /productos
const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el producto' });
  }
};

// PUT /productos/:id
const actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productoActualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el producto' });
  }
};

// DELETE /productos/:id
const eliminarProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
