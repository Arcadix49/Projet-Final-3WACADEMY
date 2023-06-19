import express from 'express';
import { createArticles, deleteArticles, updateArticles, createTeam , deleteTeam, updateTeam, getArticles, getArticleById,getTeam, getCoach, getCode } from '../controllers/coachController.js';

const router = express.Router();

router.get('/coach-back', getCoach)
router.get('/coach-back/code', getCode)
router.get('/coach-back/team', getTeam)

//Team crud
router.post('/team', createTeam)
router.delete('/team/:id', deleteTeam);
router.put('/team/:id',updateTeam);
router.get('/team/:id',getTeam);

//Article (training) crud
router.post('/create-training',createArticles);
router.delete('/training/:id', deleteArticles);
router.put('/update-training/:id',updateArticles);
router.get('/coach-back/training', getArticles)
router.get('/coach-back/training/:id', getArticleById)


export default router