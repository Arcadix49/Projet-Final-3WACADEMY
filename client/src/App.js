import './App.css'
import {useEffect} from 'react'
import { BrowserRouter , Routes, Route} from "react-router-dom"
import {publicRoutes, playerRoutes, coachRoutes} from './router/routes.js'
import {Layout} from './common/layout/layout.js'
import { PlayerMiddleware } from './router/PlayerMiddleware';
import { verifyToken } from './components/Verify/verifyToken';
import {useDispatch, useSelector} from 'react-redux'
import {addUser} from './store/slice/userSlice.js';
import {CoachMiddleware} from './router/CoachMiddleware.js';

function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

 useEffect(() => {
    const token = localStorage.getItem('token')
    if(token && !user.isLogged) {
      verifyToken()
        .then(data => {
          dispatch(addUser(data))
        })
        .catch(err => {
          
        })
    }
 },[dispatch, user.isLogged]);


return (
<BrowserRouter>
  <Routes>
    {publicRoutes.map((route, i) => (
      <Route path={route.path} element={ <Layout>{route.component}</Layout>} key={i} exact={true} />
    ))}

   {playerRoutes.map((route, i) => (
     <Route path={route.path} element={
         <PlayerMiddleware>
             <Layout>{route.component}</Layout>
         </PlayerMiddleware>} 
           key={i} 
           exact={true} />
  ))}

    {coachRoutes.map((route, i) => (
          <Route path={route.path} element={
              <CoachMiddleware>
                  <Layout>{route.component}</Layout>
              </CoachMiddleware>} 
                key={i} 
                exact={true} />
        ))}

    </Routes>

</BrowserRouter>
)
}

export default App;