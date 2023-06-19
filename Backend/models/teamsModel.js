import mongoose from "mongoose";

const teamsModel = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    code: {
        type: String,
        unique: true,
    },
    images: [{
        type: String,
    }],
}, {
    timestamps: true,
}
);

export default mongoose.model('Teams', teamsModel);
