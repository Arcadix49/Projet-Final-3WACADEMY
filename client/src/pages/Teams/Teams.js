import './teams.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Teams = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [show, setShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:9576/coach/team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ name, description })
        })
            .then(response => {
                response.json()
                    .then(data => {
                        if (response.ok) {
                            navigate('/coach/coach-back')
                        } else {
                            setErrorMessage(data.message)
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    }

    const handleShow = (e) => {
        e.preventDefault()
        setShow(prevShow => !prevShow) // toggle the show state
    }
    return (
        <main>
            <div className="bg-teamcoach">
                <div className="bg-text">
                    <h2>Crée votre équipe ! :</h2>
                </div>
            </div>

            <div className="container">
                <div className="second-block">
                    <div className="as-coach">
                        <h3>En tant que coach , vous pouvez crée des entrainement qui seront disponible pour tout vos joueurs !</h3>
                    </div><br />
                    <div className="as-coach">
                        <h3>Créez votre équipe et gérer la directement via votre compte !</h3>
                    </div>

                </div>
                <form className='form-container-coach' onSubmit={handleSubmit}>
                    <h1>Création d'équipe</h1>

                    <div className='input-control'>
                        <label className='label-title' htmlFor='email'>Nom de l'équipe:</label>
                        <input onChange={(e) => setName(e.target.value)} type="text" name="name" />
                    </div>

                    <div className='button-control'>
                        <img src="../img/lb3.jpg" alt="" />
                        <button className="btn-form" type='submit'>C'est parti !</button>

                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
        </main>

    )
}