import express from 'express';
import {getPlayer, getTeam, getArticles} from '../controllers/playerController.js'
const router = express.Router();

router.get('/player', getPlayer);
router.get('/player/team', getTeam)
router.get('/player/training', getArticles)


export default router