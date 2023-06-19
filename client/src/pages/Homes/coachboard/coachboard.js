import './coachboard.css'
import { Link } from 'react-router-dom'
import { Logout } from '../../../pages/Auth/Logout.js'
import { useEffect, useState } from "react";
import { addUser } from "../../../store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { get, remove } from '../../../helper/request';
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai'
import Modal from 'react-modal';
import { MdModeEditOutline } from 'react-icons/md'

export const Coachboard = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [training, setTraining] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    get("http://localhost:9576/coach/coach-back/code")
      .then((data) => {
        dispatch(addUser({ user: { ...user, code: data.code } }));
        setCode(data.code);
      })
      .catch((err) => {
        console.log(err)
      })

    get("http://localhost:9576/coach/coach-back/team")
      .then((data) => {
        dispatch(addUser({ user: { ...user, team: data.team } }));
        setName(data.team)
      })
      .catch((err) => {
        console.log(err)
      })

    get("http://localhost:9576/coach/coach-back/training")
      .then((data) => {
        setTraining(data);
        console.log(data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
      remove(`http://localhost:9576/coach/training/${id}`)
        .then(() => {
          setTraining(training.filter((article) => article._id !== id));
        })
        .catch((error) => {
          console.log(error);

        });
    }

    window.location.reload();
    window.alert("L'article a été supprimé avec succès.");
  }

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <main>
      <div className="onboard">
        <div className="user-info">
          <div className="lgt">
            <h2 className='wlc'>Bienvenue ! </h2>
            <Logout />
          </div>
          <div className='infos'>
            <h3 className='title-inf'>Informations: </h3>
            <ul className='ul-info'>
              <li>Email: <span style={{ color: 'orange' }}>{user.email}</span></li>
              <li>Role: <span style={{ color: 'orange' }}>{user.role}</span></li>
              <li>Pseudo: <span style={{ color: 'orange' }}>{user.pseudo}</span></li>
            </ul>
          </div>
        </div>

        {name ? (
          <div className="team-name">
            <h2 className='wlc'>Votre équipe: <span className='player' style={{ color: 'orange' }}>{name}  </span></h2>

            <h3 className='wlc'>Code d'équipe: <span className='player' style={{ color: 'orange' }}>{code}  </span></h3>
            <div className='infos'>
            </div>
          </div>
        ) : (
          <div className="team-name">
            <h2 className='wlc'>Vous devez créer une équipe pour commencer !</h2>
          </div>
        )}
      </div>

      <div className="onboard-2">
        {name && (
          <div className="add-btn">
            <Link to="/coach/create-training"><button>Ajoutez un training <AiOutlinePlus /></button></Link>

          </div>
        )}
        <h3 className="t-space">Vos entrainements :</h3>
        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Difficulté</th>
              <th>Date </th>
              <th>Contenu</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {training.articles && training.articles.length > 0 ? (
              training.articles.map((article) => (
                <tr key={article._id}>
                  <td data-label="Name">{article.title}</td>
                  <td data-label="Difficulté">{article.difficulty}</td>
                  <td data-label="Date">{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td data-label="Contenue"><button className="modal" onClick={() => handleArticleClick(article)}>
                    {article.content.split(' ').slice(0, 1).join(' ')}...</button></td>

                  <td data-label="Action" className='modif'><Link to={`/coach/update-training/${article._id}`}><button><MdModeEditOutline /></button></Link> <button onClick={() => handleDelete(article._id)}><AiFillDelete /></button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Vous n'avez pas encore d'entrainements.</td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal isOpen={selectedArticle !== null} onRequestClose={handleCloseModal}>
          <pre>{selectedArticle?.content}</pre>
          <button onClick={handleCloseModal}>Fermer</button>
        </Modal>
      </div>
    </main>
  )
}