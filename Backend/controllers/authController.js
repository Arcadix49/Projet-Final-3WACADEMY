import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const register = (req, res) => {
    const { pseudo, email, role, password } = req.body;
  
    if (!pseudo || !email || !role || !password) {
      return res.status(400).json({ message: 'Champ requis' });
    }
  
    User.findOne({ $or: [{ pseudo }, { email }] })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ message: 'Pseudo ou e-mail déjà utilisé' });
        }
  
        bcrypt.hash(password, 10)
          .then((hash) => {
            const user = new User({
              pseudo,
              email,
              role,
              password: hash,
            });
            const jwt = user.createJWT();
            user.save()
              .then((user) => res.status(201).json({ user, jwt }))
              .catch((error) =>
                res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur' })
              );
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };

export const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Champ requis' });
    }
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res
                .status(401)
                .json({ message: 'E-mail ou mot de passe incorrecte' });
        }
        bcrypt.compare(password, user.password)
            .then((isMatch) => {
                if (!isMatch) {
                    return res
                        .status(401)
                        .json({ message: 'E-mail ou mot de passe incorrecte' });
                }

                const token = user.createJWT();

                res.json({ user, token });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            });
    });
};

export const verifyToken = (req, res) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: 'Invalide' });
    }
    const token = header.split(' ')[1];
    jwt.verify(token, 'key_secret', async (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Non autorisez' });
        }
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            return res
                .status(401)
                .json({ message: 'Invalid token or no token provided' });
        }
        res.status(200).json({
            user: {
                id: user._id,
                pseudo: user.pseudo,
                email: user.email,
                role: user.role,
            },
        });
    });
};
