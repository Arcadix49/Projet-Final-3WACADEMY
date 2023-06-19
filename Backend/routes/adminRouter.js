import express from 'express';
import {admindeleteUser, adminupdateUser, admingetUser ,admincreateArticles, admindeleteArticles, adminupdateArticles, admincreateTeam , admindeleteTeam, adminupdateTeam, admingetTeam } from '../controllers/adminController.js';


const router = express.Router();

//user
router.delete('/users/:id',admindeleteUser)
router.put('/users/:id',adminupdateUser)
router.get('/users/:id',admingetUser)

//team
router.post('/team', admincreateTeam)
router.delete('/team/:id', admindeleteTeam);
router.put('/team/:id',adminupdateTeam);
router.get('/team/:id',admingetTeam);

//training
router.post('/training',admincreateArticles);
router.delete('/training/:id', admindeleteArticles);
router.put('/training/:id',adminupdateArticles);


export default router