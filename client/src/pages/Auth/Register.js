import './auth.css';

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const Register = () => {

    const navigate = useNavigate()

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:9576/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, pseudo, role })
        })
            .then(response => {
                response.json()
                    .then(data => {
                        if (response.ok) {
                            localStorage.setItem('token', data.token);
                            navigate('/auth/login')
                        } else {
                            setErrorMessage(data.message)
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            })

    };

    return (
        <div>
            <form className='form-container' onSubmit={handleSubmit}>
                <h1>S'enregistrez</h1>

                <div className='input-control'>
                    <label className='label-title' htmlFor='pseudo'>Pseudo:</label>
                    <input onChange={(e) => setPseudo(e.target.value)} type="text" name="pseudo" />
                </div>

                <div className='input-control'>
                    <label className='label-title' htmlFor='email'>E-mail:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" />
                </div>

                <div className='input-control'>
                    <label className='label-title' htmlFor='password'>Mot de passe:</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" />
                </div>



                <div className='input-control'>
                    <label className='label-title' htmlFor='role'>Role:</label>
                    <select onChange={(e) => setRole(e.target.value)} name="role">
                        <option value="">--CHOISISSEZ UN ROLE--</option>
                        <option value="player">Player</option>
                        <option value="coach">Coach</option>
                    </select>
                </div>

                <div className='button-control'>
                    <img src="../img/lb3.jpg" alt="" />
                    <button className="btn-form" type='submit'>C'est parti !</button>
                </div>

                <div className="toLog">
                    <li><Link to="/auth/login"><p className='alr-sign'>Déjà un compte ?</p></Link></li>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </form>
        </div>
    )
}