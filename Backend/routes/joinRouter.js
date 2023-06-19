import express from 'express';
import {joinTeam} from '../controllers/joinController.js'
const router = express.Router();

router.put('/:code', joinTeam)


export default router