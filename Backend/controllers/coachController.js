import Team from '../models/teamsModel.js';
import Article from '../models/articleModel.js';


function generateRandom() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getCoach = (req, res) => {

  const coachInfo = {
    pseudo: req.pseudo,
    email: req.email,
    role: req.role,
  }
  res.json(coachInfo);
}

export const getCode = (req, res) => {

  Team.findOne({ coach: req.userID }, 'code').exec()
    .then(team => {
      if (!team) {
        return res.status(404).json({ error: 'Équipe introuvable' });
      }

      res.status(200).json({ code: team.code })
    })
    .catch(error => res.status(500).json({ error }));
};

export const getTeam = (req, res) => {

  Team.findOne({ coach: req.userID }).exec()
    .then(team => {
      if (!team) {
        return res.status(404).json({ error: 'Équipe introuvable' });
      }

      res.status(200).json({ team: team.name });
    })
    .catch(error => res.status(500).json({ error }));

};



export const createTeam = async (req, res) => {

  const code = generateRandom();
  if (!req.body.name) {
    return res.status(400).json({ message: 'Champ requis' });
  }
  try {
    const existingTeam = await Team.findOne({ coach: req.userID });
    if (existingTeam) {
      return res.status(409).json({ message: "Vous ne pouvez pas crée d'autre équipe" });
    }

    const newTeam = new Team({
      name: req.body.name,
      code,
      coach: req.userID,
    });

    await newTeam.save();

    res.status(201).json(newTeam);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteTeam = async (req, res) => {
  try {
    const team = Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Équipe introuvable" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};


export const updateTeam = async (req, res) => {
  try {
    const team = Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Équipe introuvable" });
    }
    if (team.coach.toString() !== req.userID) {
      return res.status(403).json({ message: "Vous n'êtes pas autoriser à modifer cette équipe" });
    }
    Team.findByIdAndUpdate(req.params.id, updateTeam, { new: true });

    res.status(200).json({ message: "équipe mis à jour !", updateTeam });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


//Entrainement
export const createArticles = async (req, res) => {
  const { title, content, difficulty } = req.body;
  if (!title || !content || !difficulty) {
    return res.status(400).json({ message: 'Champ requis' });
  }
  try {
    const team = await Team.findOne({ coach: req.userID });
    if (!team) {
      return res.status(404).json({ message: "Coach d'équipe introuvable" });
    }

    const newArticle = new Article({
      title,
      content,
      difficulty,
      team: team._id
    });

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updateArticles = (req, res) => {
  const { title, content, difficulty } = req.body;
  if (!title || !content || !difficulty) {
    res.status(400).json({ message: "Champ requis" });
  } else {
    Article.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => {
        Article.findById(req.params.id)
          .then((updatedArticle) => {
            res.status(200).json({ message: "article mis à jour !", title: updatedArticle.title, content: updatedArticle.content, difficulty: updatedArticle.difficulty });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
}

export const getArticles = async (req, res) => {
  try {
    const team = await Team.findOne({ coach: req.userID });
    if (!team) {
      return res.status(404).json({ message: "Coach d'équipe introuvable" });
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

export const getArticleById = async (req, res) => {
  try {
    const team = await Team.findOne({ coach: req.userID });
    if (!team) {
      return res.status(404).json({ message: "Coach d'équipe introuvable" });
    }

    const article = await Article.findOne({ _id: req.params.id, team: team._id });
    if (!article) {
      return res.status(404).json({ message: "Article introuvable" });
    }

    res.status(200).json({ article });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteArticles = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ message: 'L\'article que vous essayez de supprimer n\'existe pas.' });
    }
    res.json({ message: 'L\'article a été supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la suppression de l\'article.' });
  }
};