import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../store/slice/userSlice.js';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const user = useSelector((state => state.user))
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:9576/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        response.json()
          .then(data => {
            if (response.ok) {
              dispatch(addUser({ user: { ...data.user, team: data.team } }));
              localStorage.setItem('token', data.token);
              if (data.user.role === 'player') {
                navigate('/user/player');
              } else if (data.user.role === 'coach') {
                navigate('/coach/coach-back');
              }
            } else {
              setErrorMessage(data.message);
            }
          })
          .catch(error => {
            alert(error.message);
          });
      });
  }
  return (
    <div>
      <form className='form-container' onSubmit={handleSubmit}>
        <h1>Connexion</h1>

        <div className='input-control'>
          <label className='label-title' htmlFor='email'>E-mail:</label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" />
        </div>

        <div className='input-control'>
          <label className='label-title' htmlFor='pasword'>Mot de passe:</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
        </div>

        <div className='button-control'>
          <img src="../img/lb3.jpg" alt="" />
          <button className="btn-form" type='submit'>C'est parti !</button>

        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>

  )
}
