import Article from '../models/articleModel.js'
import Team from '../models/teamsModel.js'

export const getTraining = (req, res) => {
  const articleId = req.params.id;
  const userId = req.userID;

  try {
    Article.findById(articleId)
      .then(article => {
        if (!article) {
          return res.status(404).json({ message: "Article non existant"});
        }
        Team.findById(article.team)
          .then(team => {
            if (!team) {
              return res.status(404).json({ message: "Artcile de l'équipe introuvable" });
            }
            if (!team.players.includes(userId) && team.coach !== userId) {
              return res.status(403).json({ message: "accès refusé" });
            }
            return res.status(200).json({ article });
          })
          .catch(error => {
            console.error(error);
            return res.status(500).json({ message: 'Server error when trying to retrieve the article' });
          });
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({ message: 'Server error when trying to retrieve the article' });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error when trying to retrieve the article' });
  }
};
