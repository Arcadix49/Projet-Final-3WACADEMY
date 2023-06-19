import Comment from "../models/commentModel.js";


export const addComment = async (req, res) => {
  const { comment } = req.body;
  console.log(req.body);
  if (!comment) {
    return res.status(400).json({ message: 'Champs requis' });
  }
  const newComment = new Comment({
    comment,
    user: req.userID
  });
  try {
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = (req, res) => {
  const commentId = req.params.id;

  const userId = req.userID

  Comment.findOne({ _id: commentId, user: userId })
    .then(Comment => {
      if (!Comment) {
        return res.status(404).json({ message: "Commentaire non trouvé ou vous n'êtes pas l'auteur du commentaire." });
      }
      Comment.deleteOne({ _id: commentId })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé.' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
}
