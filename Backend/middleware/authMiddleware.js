import jwt from 'jsonwebtoken'
import Team from '../models/teamsModel.js';
import Article from '../models/articleModel.js';

export const verifyToken = (req, res, next) => {

  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ message: 'Invalide' });

  }
  const token = header.split(' ')[1]

  jwt.verify(token, "key_secret", async (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "Non autorisez" });
      return
    }

    req.userID = decoded._id

    next()
  });

}

export const verifyTeamAccess = (req, res, next) => {

  const userID = req.userID;
  const articleID = req.params.id;

  Team.findOne({ $or: [{ players: userID }, { coach: userID }] })
    .then(team => {
      if (!team) {
        return res.status(401).json({ message: 'Non autorisez' });
      }

      Article.findOne({ _id: articleID, team: team._id })
        .then(article => {
          if (!article) {
            return res.status(401).json({ message: 'Non autorisez' });
          }

          next();
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
};

export const verifyCoach = (req, res, next) => {

  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ message: 'Non autorisez' });

  }
  const token = header.split(' ')[1]

  jwt.verify(token, "key_secret", async (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "Non autorisez" });
      return
    }
    req.role = decoded.role
    req.userID = decoded.id

    if (req.role !== "coach") {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.' });
    }
    next()
  });
}

export const verifyAdmin = (req, res, next) => {

  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ message: 'Non autorisez' });

  }
  const token = header.split(' ')[1]

  jwt.verify(token, "key_secret", async (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Non autorisez" });

    }
    
    req.role = decoded.role

    if (req.role !== "admin") {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.' });
    }
    next()
  });
}

export const verifyPlayer = (req, res, next) => {

  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ message: 'Non autorisez' });

  }
  const token = header.split(' ')[1]

  jwt.verify(token, "key_secret", async (err, decoded) => {
    if (err) {
      res.status(403).send({ message: "Non autorisez" });
      return
    }
    req.userID = decoded.id
    req.role = decoded.role
    req.pseudo = decoded.pseudo
    req.email = decoded.email

    if (req.role !== "player") {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource.' });
    }
    next()
  });

}

export const auth = {
  verifyToken,
  verifyTeamAccess,
  verifyCoach,
  verifyAdmin,
  verifyPlayer

}