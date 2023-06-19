import Team from "../models/teamsModel.js";
import Article from "../models/articleModel.js";
export const getPlayer = (req, res) => {

  const playerInfo = {
    pseudo: req.pseudo,
    email: req.email,
    role: req.role,
  }
  res.json(playerInfo);
}

export const getTeam = (req, res) => {

  Team.findOne({ players: { $in: [req.userID] } }, 'name').exec()
    .then(team => {

      if (!team) {
        return res.status(404).json({ error: 'Équipe non trouvée' });
      }
      res.status(200).json({ team: team.name })
    })
    .catch(error => res.status(500).json({ error }));
};

export const getArticles = async (req, res) => {
  try {
    const team = await Team.findOne({ players: { $in: [req.userID] } });
    console.log(req.userID)
    if (!team) {
      return res.status(404).json({ message: "joueur introuvable" });
    }

    const articles = await Article.find({ team: team._id });
    if (!articles.length) {
      return res.status(404).json({ message: "Pas d'articles trouver pour cette équipe" });
    }

    res.status(200).json({ articles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};