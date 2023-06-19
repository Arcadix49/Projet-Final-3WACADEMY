import './training.css'
import { useState } from 'react'
import { post } from '../../helper/request.js';
export const Training = () => {

    const [tName, TsetName] = useState("")
    const [tDiff, TsetDiff] = useState("")
    const [tCont, TsetCont] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await post("http://localhost:9576/coach/create-training", {
                title: tName,
                content: tCont,
                difficulty: tDiff
            })
            setSuccessMessage('L\'entrainement a été créez avec succès !');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };
    return (
        <main>
            <div className='onboard'>
                <form className='form-container' onSubmit={handleSubmit}>
                    <h1>Ajoutez un Training</h1>

                    <div className='input-control'>
                        <label className='label-title' htmlFor='title'>Nom: </label>
                        <input onChange={(e) => TsetName(e.target.value)} type="text" name="title" />

                    </div>

                    <div className='input-control'>
                        <label className='label-title' htmlFor='difficulty'>Difficulté:</label>
                        <select onChange={(e) => TsetDiff(e.target.value)} name="difficulty">
                            <option value="">--CHOISISSEZ UN NIVEAU--</option>
                            <option value="facile">Facile</option>
                            <option value="moyen">Moyen</option>
                            <option value="difficile">Difficile</option>
                        </select>
                    </div>

                    <div className='input-control'>
                        <label className='label-title' htmlFor='content'>Contenu: </label>
                        <textarea onChange={(e) => TsetCont(e.target.value)} type="text" name="content" />

                    </div>

                    <div className='button-control'>
                        <img src="../img/lb3.jpg" alt="" />
                        <button className="btn-form" type='submit'>C'est parti !</button>

                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </form>
            </div>
        </main>
    )

}