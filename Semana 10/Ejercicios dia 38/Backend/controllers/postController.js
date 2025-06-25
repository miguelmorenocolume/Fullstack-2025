import mongoose from 'mongoose';
import Post from '../models/Post.js';

// Crear post (requiere token)
export const createPost = async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content || !image) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const post = await Post.create({
      title,
      content,
      image,
      author: req.user._id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los posts (público)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Editar post (solo si es del autor)
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { title, content, image } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para editar este post' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.image = image || post.image;

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar post (solo si es del autor)
export const deletePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para eliminar este post' });
    }

    await post.deleteOne();

    res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un post por ID (público)
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'ID de post inválido' });
  }

  try {
    const post = await Post.findById(postId)
      .populate('author', 'username')
      .populate('comments.author', 'username');  // popular autor de comentarios

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Añadir comentario a un post (requiere token)
export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: 'El texto del comentario es obligatorio' });

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'ID de post inválido' });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post no encontrado' });

    post.comments.push({
      text,
      author: req.user._id,
    });

    await post.save();

    const index = post.comments.length - 1;
    await post.populate(`comments.${index}.author`, 'username');

    const newComment = post.comments[index];

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
