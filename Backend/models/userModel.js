import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userModel = new mongoose.Schema({
    pseudo: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['player', 'coach', 'admin']
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    image: [{
        type: String,
    }]
}, {
    timestamps: true,
}
);

userModel.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        pseudo: this.pseudo,
        role: this.role,
        team: this.team,
    }, 'key_secret', { expiresIn: '24h' })
}

userModel.post('save', function (err, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Cet email est déjà utilisé'));
    } else {
        next(err)
    }
})

export default mongoose.model('User', userModel);






