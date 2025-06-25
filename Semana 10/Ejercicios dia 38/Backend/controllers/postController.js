import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    console.log('createPost - req.user:', req.user);
    const { title, content, image } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      console.log('createPost - No userId en req.user');
      return res.status(401).json({ message: 'No autorizado, falta userId' });
    }

    if (!title || !content || !image) {
      console.log('createPost - Datos incompletos:', { title, content, image });
      return res.status(400).json({ message: 'Título, contenido e imagen son obligatorios' });
    }

    const newPost = new Post({
      title,
      content,
      image,
      author: userId,
    });

    await newPost.save();
    res.status(201).json({ message: 'Publicación creada', post: newPost });
  } catch (error) {
    console.error('Error en createPost:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    console.log('getPosts - solicitud recibida');
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error en getPosts:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    console.log('updatePost - req.user:', req.user);
    const { postId, title, content, image } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      console.log('updatePost - No userId en req.user');
      return res.status(401).json({ message: 'No autorizado, falta userId' });
    }

    if (!postId || !title || !content || !image) {
      console.log('updatePost - Datos incompletos:', { postId, title, content, image });
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      console.log('updatePost - Post no encontrado:', postId);
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    if (post.author.toString() !== userId) {
      console.log('updatePost - Usuario no autorizado para editar:', { postAuthor: post.author.toString(), userId });
      return res.status(403).json({ message: 'No autorizado para editar esta publicación' });
    }

    post.title = title;
    post.content = content;
    post.image = image;
    post.updatedAt = new Date();

    await post.save();
    res.status(200).json({ message: 'Publicación actualizada', post });
  } catch (error) {
    console.error('Error en updatePost:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    console.log('deletePost - req.user:', req.user);
    const { postId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      console.log('deletePost - No userId en req.user');
      return res.status(401).json({ message: 'No autorizado, falta userId' });
    }

    if (!postId) {
      console.log('deletePost - Falta postId en body');
      return res.status(400).json({ message: 'postId es obligatorio' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      console.log('deletePost - Post no encontrado:', postId);
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    if (post.author.toString() !== userId) {
      console.log('deletePost - Usuario no autorizado para eliminar:', { postAuthor: post.author.toString(), userId });
      return res.status(403).json({ message: 'No autorizado para eliminar esta publicación' });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Publicación eliminada' });
  } catch (error) {
    console.error('Error en deletePost:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};
