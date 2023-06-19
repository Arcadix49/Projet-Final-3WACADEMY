import "./jointeam.css";
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const JoinTeam = () => {

  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9576/join/${code}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ code })
    })
      .then(response => {
        response.json()
          .then(data => {
            if (response.ok) {
              navigate('/user/player')
            } else {
              setErrorMessage(data.message)
            }

          })
          .catch(err => {
            console.log(err);
          })
      })
  }
  return (
    <>
      <div className="bg-join">
        <div className="bg-text">
          <h2>Rejoignez une équipe :</h2>
        </div>
      </div>

      <div className="container-join">

        <div className="third-block">

          <h3>Pourquoi rejoindre une équipe ?</h3>

          <div className="description-join">
            <ul className="clues">
              <li className="join">
                <div className="block"></div>Soyez prêt pour vos futur match
              </li>
              <li className="join">
                <div className="block"></div>Consultez les entrainements
              </li>
              <li className="join">
                <div className="block"></div>Donnez votre avis
              </li>
              <li className="join">
                <div className="block"></div>Progressez plus vite !
              </li>
            </ul>
          </div>
        </div>

        <div className="fourth-block">
          <h3>Entrez votre code d'équipe !</h3>

          <div className="entercode">

            <form onSubmit={handleSubmit} className="cod">
              <label>Code:</label>
              <input className="sub" type="text" name="code" onChange={(e) => setCode(e.target.value)} />
              <input className="sub1" type="submit" name="submit" value="OK" />
            </form>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};
