import { useDispatch, useSelector } from "react-redux";
import "./playerboard.css";
import { Link } from "react-router-dom";
import { Logout } from "../../../pages/Auth/Logout.js";
import { useEffect, useState } from "react";
import { addUser } from "../../../store/slice/userSlice";
import { get } from '../../../helper/request';
import Modal from 'react-modal';

export const Playerboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [training, setTraining] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    get("http://localhost:9576/user/player/team")
      .then((data) => {
        dispatch(addUser({ user: { ...user, team: data.team } }));
        setName(data.team);
      })
      .catch((error) => {
        console.error("Error fetching team:", error);
      });

    get("http://localhost:9576/user/player/training")
      .then((data) => {
        setTraining(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            <h2 className="wlc">Bienvenue !</h2>
            <Logout />
          </div>
          <div className="infos">
            <h3 className="title-inf">Informations: </h3>
            <ul className="ul-info">
              <li>
                E-mail: <span style={{ color: "orange" }}>{user.email}</span>
              </li>
              <li>
                Role: <span style={{ color: "orange" }}>{user.role}</span>
              </li>
              <li>
                Pseudo: <span style={{ color: "orange" }}>{user.pseudo}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="team-name">
          <h2 className="wlc">
            Votre équipe:<span className="player" style={{ color: "orange" }}>  {name}</span>
          </h2>
        </div>
      </div>
      <div className="onboard-2">
        <h3 className="t-space">Vos entrainements :</h3>
        {training.articles && training.articles.length > 0 ? (
          <div className="training-info">
            {training.articles.map((article) => (
              <div key={article.id} className="article-div">
                <img src="../img/dez.jpg" alt="" />
                <div className="left">
                  <h3 className="article-title">Titre : {article.title}</h3>
                  <p className="article-content">Contenu : <button className="modal" onClick={() => handleArticleClick(article)}>
                    {article.content.split(' ').slice(0, 1).join(' ')}...</button></p>
                  <p className="article-date">Date :{new Date(article.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun entrainement trouvé.</p>
        )}
        <Modal isOpen={selectedArticle !== null} onRequestClose={handleCloseModal}>
          <pre>{selectedArticle?.content}</pre>
          <button onClick={handleCloseModal}>Fermer</button>
        </Modal>
      </div>
    </main>
  );
};