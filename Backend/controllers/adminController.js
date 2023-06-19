import User from '../models/userModel.js';
import Team from '../models/teamsModel.js';
import Article from '../models/articleModel.js';
import formidable from 'formidable';
import { copyFiles } from '../utils/copyfiles.js';

function generateRandom() {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

//Crud équipe
export const admindeleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvée' });
            }
            res.status(200).json({ message: 'Utilisateur supprimé' });
        })
        .catch((error) => res.status(400).json({ error }));
};

export const adminupdateUser = (req, res) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => {
            User.findById(req.params.id)
                .then((user) => {
                    res.status(200).json({
                        message: 'Utilisateur mis à jour',
                        pseudo: user.pseudo,
                        email: user.email,
                        password: user.password,
                    });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

export const admingetUser = (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ user });
        })
        .catch((error) => res.status(500).json({ error }));
};

export const admincreateTeam = async (req, res) => {
    try {
        const code = generateRandom();

        const form = formidable({ multiples: true });
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).json(err.message);
            console.log(files.images);
            const images = await copyFiles(files.images ?? [], 'img/logo');
            console.log(files);

            const newTeam = new Team({
                name: fields.name,
                code,
                description: fields.description,
                images,
                coach: req.userID,
            });

            await newTeam.save();

            res.status(201).json(newTeam);
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const admindeleteTeam = (req, res) => {
    Team.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Équipe non trouvée' });
            }
            res.status(200).json({ message: 'Équipe supprimée' });
        })
        .catch((error) => res.status(400).json({ error }));
};

export const adminupdateTeam = (req, res) => {
    Team.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => {
            Team.findById(req.params.id)
                .then((updatedTeam) => {
                    res.status(200).json({
                        message: 'Team updated successfully',
                        name: updatedTeam.name,
                        description: updatedTeam.description,
                        players: updatedTeam.players,
                    });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

export const admingetTeam = (req, res) => {
    Team.findById(req.params.id)
        .then((Team) => {
            if (!Team) {
                return res.status(404).json({ error: 'Équipe non trouvée' });
            }
            res.status(200).json({ Team });
        })
        .catch((error) => res.status(500).json({ error }));
};

//Crud Entrainement

export const admincreateArticles = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
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
            team: team._id,
        });

        await newArticle.save();

        res.status(201).json(newArticle);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
};

export const admindeleteArticles = (req, res) => {
    Article.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Article non trouvée' });
            }
            res.status(200).json({ message: 'Article supprimé' });
        })
        .catch((error) => res.status(400).json({ error }));
};

export const adminupdateArticles = (req, res) => {
    Article.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => {
            Article.findById(req.params.id)
                .then((updatedArticle) => {
                    res.status(200).json({
                        message: 'Article mis à jour',
                        title: updatedArticle.title,
                        content: updatedArticle.content,
                        images: updatedArticle.images,
                    });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

export const admingetArticles = (req, res) => {
    Article.findById(req.params.id)
        .then((Article) => {
            if (!Article) {
                return res.status(404).json({ error: 'Article non trouvée' });
            }
            res.status(200).json({ Article });
        })
        .catch((error) => res.status(500).json({ error }));
};
