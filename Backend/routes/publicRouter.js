import express from 'express';
import {addComment, deleteComment, getComments} from '../controllers/commController.js';
import {auth} from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/article/comments',[auth.verifyToken], getComments)
router.post('/article/comment',[auth.verifyToken], addComment);
router.delete('/article/comment/:id',[auth.verifyToken], deleteComment);

export default router