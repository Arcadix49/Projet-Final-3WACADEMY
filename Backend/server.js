import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import coachRouter from './routes/coachRouter.js'; 
import {auth} from './middleware/authMiddleware.js';
import publicRouter from './routes/publicRouter.js';
import teamRouter from './routes/teamRouter.js';
import joinRouter from './routes/joinRouter.js'
import adminRouter from './routes/adminRouter.js'
import playerRouter from './routes/playerRouter.js'

const app = express();



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// BDD

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://romsmoxx:xQPFlvLGUCVWjYs4@traintotop.yg0gere.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on("error", () => {
    console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
    console.log("Connexion à la base de données établie");
    app.use(express.static('public'));
    app.use('/auth', authRouter);
    app.use('/articles', publicRouter);
    app.use('/team', [auth.verifyToken], teamRouter)
    app.use('/join', [auth.verifyToken ,auth.verifyPlayer], joinRouter)
    app.use('/user', [auth.verifyToken, auth.verifyPlayer], playerRouter)
    app.use('/admin',[auth.verifyToken, auth.verifyAdmin],adminRouter)
    app.use('/coach', [auth.verifyToken,auth.verifyCoach], coachRouter)

})

app.listen(9576,function(){
    console.log(`http://localhost:9576`);
});