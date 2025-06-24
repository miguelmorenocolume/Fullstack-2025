import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.userId;

    if (!postId || !content)
      return res.status(400).json({ message: 'Contenido y postId son obligatorios' });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

    const newComment = new Comment({
      content,
      author: userId,
      post: postId,
      createdAt: new Date(),
    });

    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: 'Comentario creado', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId, content } = req.body;
    const userId = req.user.userId;

    if (!commentId || !content)
      return res.status(400).json({ message: 'Datos incompletos' });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

    if (comment.author.toString() !== userId)
      return res.status(403).json({ message: 'No autorizado para editar este comentario' });

    comment.content = content;
    comment.updatedAt = new Date();

    await comment.save();
    res.status(200).json({ message: 'Comentario actualizado', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user.userId;

    if (!commentId)
      return res.status(400).json({ message: 'commentId es obligatorio' });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comentario no encontrado' });

    if (comment.author.toString() !== userId)
      return res.status(403).json({ message: 'No autorizado para eliminar este comentario' });

    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comentario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
