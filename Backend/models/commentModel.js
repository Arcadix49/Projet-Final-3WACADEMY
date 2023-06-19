import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
    title: {
        type: String,
    },
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
        strictPopulate: false
    },
}, {
    timestamps: true,
}
);

export default mongoose.model('Comment', commentModel);
