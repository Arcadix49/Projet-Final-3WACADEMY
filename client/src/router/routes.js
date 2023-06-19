import { Register } from '../pages/Auth/Register.js';
import { Login } from '../pages/Auth/Login.js';
import { Home } from '../pages/Homes/Home.js';
import { Teams } from '../pages/Teams/Teams.js';
import { Articles } from '../pages/Article/article.js';
import { Playerboard } from '../pages/Homes/playerboard/playerboard.js';
import { Coachboard } from '../pages/Homes/coachboard/coachboard.js';
import { JoinTeam } from '../pages/Teams/Join/jointeam.js';
import { Training } from '../pages/Training/training.js';
import { UpdateT } from '../pages/Training/updateT.js'

const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/auth/register", component: <Register /> },
    { path: "/auth/login", component: <Login /> },
    { path: "/articles", component: <Articles /> }
]

const playerRoutes = [
    { path: "/user/player", component: <Playerboard /> },
    { path: "/auth/login", component: <Login /> },
    { path: "/articles", component: <Articles /> },
    { path: "/join", component: <JoinTeam /> },
    { path: "/", component: <Home /> }
]


const coachRoutes = [
    { path: "/coach/coach-back", component: <Coachboard /> },
    { path: "/coach/update-training/:id", component: <UpdateT /> },
    { path: "/coach/create-training", component: <Training /> },
    { path: "/auth/login", component: <Login /> },
    { path: "/coach/team", component: <Teams /> },
    { path: "/articles", component: <Articles /> },
    { path: "/", component: <Home /> }
]


export { publicRoutes, playerRoutes, coachRoutes } 