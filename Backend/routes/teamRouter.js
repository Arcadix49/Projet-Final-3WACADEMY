import express from 'express';
import {getTraining} from '../controllers/teamController.js';
import {getTeam} from '../controllers/coachController.js';
import {auth} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/training/:id',[auth.verifyTeamAccess],getTraining);
router.get('/:id',[auth.verifyToken], getTeam)


export default router