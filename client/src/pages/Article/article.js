import './article.css';
import { useState, useEffect } from 'react';
import { post, get } from '../../helper/request.js';

export const Articles = () => {
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    get('http://localhost:9576/articles/article/comments')
      .then((data) => {
        setShowComment(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [showComment]); // Ajouter showComment comme dépendance

  const handleSubmit = (e) => {
    e.preventDefault();
    post('http://localhost:9576/articles/article/comment', { comment })
      .then((data) => {
        console.log(data);
        const newComment = data?.comment;
        if (newComment) {
          setShowComment((prevComments) => [...prevComments, newComment]);
          setComment('');
          setSuccess('Commentaire ajouté !');
          setError('');
        } else {
          setError("Erreur lors de l'ajout du commentaire");
          setSuccess('');
        }
      })
      .catch((err) => {
        setError(err.message);
        setSuccess('');
        console.error(err);
      });
  };
    return (
        <main>
            <div className="art-wrapper">
                <section className='art-area'>
                    <h2 className="art-title">Qui est Victor Wembanyama, jeune prodige du basket français ?</h2>
                    <article>
                        <div className='art-wemb'>
                            <h3>La licorne du basket mondial</h3>
                            <p>Une licorne. C’est ainsi que les spécialistes du basket mondial qualifient depuis plusieurs années Victor Wembanyama, tant le profil du joueur français de 18 ans paraît unique dans l’histoire de ce sport. Malgré sa taille (2,21 mètres), qui le situe bien au-dessus de la moyenne de ses congénères, le jeune homme se meut sur le terrain avec agilité ; il dribble et shoote avec l’aisance d’un arrière ou d’un ailier. Les Etats-Unis ont découvert le ­phénomène à l’occasion de deux matchs d’exhibition joués à Las Vegas, les 4 et 6 octobre, avec son club, les Metropolitans 92 de Boulogne-Levallois. Résultat ? « C’est un extraterrestre, le talent d’une génération », a loué l’Américain LeBron James, un des meilleurs joueurs au monde de ces vingt dernières années.</p>
                            <h3>Cap sur l’Amérique</h3>
                            <p> Ces deux rencontres avec une équipe de joueurs évoluant dans l’antichambre de la NBA étaient organisées dans le but de présenter la pépite au public américain par l’intermédiaire de la chaîne spécialisée dans le sport ESPN. Le calendrier du championnat français a même été bousculé afin que les Metropolitans 92 puissent se déplacer dans le Nevada. Auteur de 37 points dans le premier match, puis de 36 dans le second, « Wemby » – son nouveau surnom outre-Atlantique – a largement dépassé les attentes. Slam, le magazine-phare du basket aux Etats-Unis, ne s’y est pas trompé en consacrant sa « une » au Français quelques jours avant l’événement. Il est attendu en tête de la draft de la NBA, en 2023, processus annuel de sélection des jeunes talents souhaitant rejoindre la célèbre ligue de basket. Certains clubs seraient d’ailleurs prêts à perdre délibérément un maximum de matchs cette saison afin de pouvoir le récupérer (les équipes aux plus mauvais résultats ont la priorité dans le choix des joueurs).</p>
                            <h3>Programmé pour les sommets</h3>
                            <p>Les choix de carrière de Victor Wembanyama témoignent d’une vision sûre des marches à gravir pour atteindre les sommets. En 2021, après un passage au Centre fédéral – pépinière des meilleurs espoirs français –, il rejoint l’ASVEL, le club propriété de Tony Parker, afin de s’aguerrir dans une équipe disputant l’Euroleague (l’équivalent en basket de la Ligue des champions en football). Une saison plus tard, le voilà à Boulogne-Levallois. La destination est moins huppée, mais elle lui permet de bénéficier d’un temps de jeu plus important en prévision du grand saut vers la NBA. La perspective, aussi, de s’épanouir sous les ordres de son entraîneur Vincent Collet, par ailleurs sélectionneur de l’équipe de France. Les Bleus, médaillés d’argent aux Jeux olympiques de Tokyo, en 2021, espèrent que le renfort du jeune homme leur permettra de décrocher l’or, à Paris, en 2024.</p>
                        </div>
                        <hr></hr>
                    </article>
                    <div className="comments-sec">
                        <form className='comm' onSubmit={handleSubmit}>
                            <label>Ajoutez un commentaire:</label>
                            <div className='section-comment'>
                                <textarea name="comment" className='comment' onChange={(e) => setComment(e.target.value)} />
                                <button className="btn-form" type="submit">commenter</button>
                                {error && <p className="error-message">{error}</p>}
                                {success && <p className="success-message">{success}</p>}
                            </div>
                        </form>

                        <ul>
                         <p>Commentaires :</p>
                            {showComment.map((comment, index) => (
                                <li className='comments-an' key={index}>
                                    Anonyme : <span className='player' style={{ color: 'orange' }}>{comment.comment}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </main>
    )
}