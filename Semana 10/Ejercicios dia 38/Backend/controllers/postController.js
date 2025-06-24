import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, imageBase64 } = req.body;
    const userId = req.user.userId;

    if (!title || !content || !imageBase64)
      return res.status(400).json({ message: 'Título, contenido e imagen son obligatorios' });

    const newPost = new Post({
      title,
      content,
      imageBase64,
      author: userId,
      createdAt: new Date(),
    });

    await newPost.save();
    res.status(201).json({ message: 'Publicación creada', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const getPosts = async (req, res) => {
  try {
    // No requiere auth
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('comments');

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId, title, content, imageBase64 } = req.body;
    const userId = req.user.userId;

    if (!postId || !title || !content || !imageBase64)
      return res.status(400).json({ message: 'Datos incompletos' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

    if (post.author.toString() !== userId)
      return res.status(403).json({ message: 'No autorizado para editar esta publicación' });

    post.title = title;
    post.content = content;
    post.imageBase64 = imageBase64;
    post.updatedAt = new Date();

    await post.save();
    res.status(200).json({ message: 'Publicación actualizada', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.userId;

    if (!postId)
      return res.status(400).json({ message: 'postId es obligatorio' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

    if (post.author.toString() !== userId)
      return res.status(403).json({ message: 'No autorizado para eliminar esta publicación' });

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Publicación eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
