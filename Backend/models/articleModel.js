import mongoose from "mongoose";

const articleModel = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    difficulty: {
        type: String,
    },
    images: [{
        type: String,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
}, {
    timestamps: true,
}
);

export default mongoose.model('Article', articleModel);
