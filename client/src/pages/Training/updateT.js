import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get, put } from "../../helper/request.js";

export const UpdateT = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    get(`http://localhost:9576/coach/training/${id}`)
      .then((data) => {
        setTitle(data.title);
        setDifficulty(data.difficulty);
        setContent(data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`http://localhost:9576/coach/update-training/${id}`, { title, difficulty, content })
      .then(() => {
        setSuccess("L'article a été mis à jour avec succès.");
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setSuccess("");
      });
  };

  return (
    <main>
      <div className="onboard">
        <form className='form-container' onSubmit={handleSubmit}>
          <h1>Modifier un entrainement</h1>

          <div className='input-control'>
            <label className='label-title' htmlFor='title'>Titre :</label>
            <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" />

          </div>

          <div className='input-control'>
            <label className='label-title' htmlFor='difficulty'>Difficulté :</label>
            <select onChange={(e) => setDifficulty(e.target.value)} name="difficulty">
              <option value="">--CHOISISSEZ UNE DIFFICULTÉ--</option>
              <option value="Facile">Facile</option>
              <option value="Moyen">Moyen</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className='input-control'>
            <label className='label-title' htmlFor='contenu'>Contenu :</label>
            <textarea onChange={(e) => setContent(e.target.value)} type="text" name="content" />

          </div>

          <div className='button-control'>
            <img src="../../img/lb3.jpg" alt="" />
            <button className="btn-form" type='submit'>C'est parti !</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </main>
  );
};