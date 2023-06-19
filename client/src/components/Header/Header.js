import "./header.css"
import { FaBasketballBall } from 'react-icons/fa'
import { GiBasketballJersey } from 'react-icons/gi'
import { MdArticle, MdAccountCircle } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { useWindowDimensions } from '../../utils/utils.js'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import { BiLogIn } from 'react-icons/bi';


export const Header = () => {
  const [showlinks, setShowLinks] = useState(true)
  const { width } = useWindowDimensions();

  const user = useSelector((state) => state.user);

  const handleShowLinks = () => {
    setShowLinks(!showlinks)
  }

  let TeamPath;
  switch (user.role) {
    case 'player':
      TeamPath = '/join';
      break;
    case 'coach':
      TeamPath = '/coach/team';
      break;
    case 'admin':
      TeamPath = '/';
      break;
    default:
      TeamPath = '/';
      break;
  }

  const handleClick = () => {
    console.log('ok')
    setShowLinks(false)
  }
  useEffect(() => {
    if (width >= 992) {
      setShowLinks(true);
    }
  }, [width]);

  return (
    <header>
      <nav className="navbar show-nav">
        <div className="logo">TRAIN TO TOP</div>
        {width >= 992 && (
          <ul className="nav-links">
            <li className="nav-link">
              <Link className="nav-items" to="/" onClick={handleClick}>
                <FaBasketballBall /> Accueil
              </Link>
            </li>

            <li className="nav-link">
              <Link className="nav-items" to={TeamPath} onClick={handleClick}>
                <GiBasketballJersey /> Équipes
              </Link>
            </li>

            <li className="nav-link">
              <Link className="nav-items" to="/articles" onClick={handleClick}>
                <MdArticle /> Articles
              </Link>
            </li>
            {user && (user.role === 'admin' || user.role === 'coach' || user.role === 'player') ? (
              <>
                {user.role === 'player' && (
                  <li className="nav-link">
                    <Link className="nav-items" to="/user/player" onClick={handleClick}>
                      <MdAccountCircle /> Mon compte
                    </Link>
                  </li>
                )}
                {user.role === 'coach' && (
                  <li className="nav-link">
                    <Link className="nav-items" to="/coach/coach-back" onClick={handleClick}>
                      <MdAccountCircle /> Mon compte
                    </Link>
                  </li>
                )}
                {user.role === 'admin' && (
                  <li className="nav-link">
                    <Link className="nav-items" to="/admin" onClick={handleClick}>
                      <MdAccountCircle /> Mon compte
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <li className="nav-link">
                <Link className="nav-items" to="/auth/register" onClick={handleClick}>
                  <BiLogIn /> S'enregistrer
                </Link>
              </li>
            )}
          </ul>
        )}
        {width < 992 && !showlinks && (
          <>
            <ul className="nav-links">
              <li className="nav-link">
                <Link className="nav-items" to="/" onClick={handleClick}>
                  <FaBasketballBall /> Accueil
                </Link>
              </li>

              <li className="nav-link">
                <Link className="nav-items" to={TeamPath} onClick={handleClick}>
                  <GiBasketballJersey /> Équipes
                </Link>
              </li>

              <li className="nav-link">
                <Link className="nav-items" to="/articles" onClick={handleClick}>
                  <MdArticle /> Articles
                </Link>
              </li>

              {user && (user.role === 'admin' || user.role === 'coach' || user.role === 'player') ? (
                <>
                  {user.role === 'player' && (
                    <li className="nav-link">
                      <Link className="nav-items" to="/user/player" onClick={handleClick}>
                        <MdAccountCircle /> Mon compte
                      </Link>
                    </li>
                  )}

                  {user.role === 'coach' && (
                    <li className="nav-link">
                      <Link className="nav-items" to="/coach/coach-back" onClick={handleClick}>
                        <MdAccountCircle /> Mon compte
                      </Link>
                    </li>
                  )}

                  {user.role === 'admin' && (
                    <li className="nav-link">
                      <Link className="nav-items" to="/admin" onClick={handleClick}>
                        <MdAccountCircle /> Mon compte
                      </Link>
                    </li>
                  )}
                </>
              ) : (
                <li className="nav-link">
                  <Link className="nav-items" to="/auth/register" onClick={handleClick}>
                    <BiLogIn /> S'enregistrer
                  </Link>
                </li>
              )}
            </ul>

            <button className="burger" onClick={handleShowLinks}>
              <span className="burger-bar"></span>
            </button>
          </>
        )}

        {width < 992 && showlinks && (
          <button className="burger" onClick={handleShowLinks}>
            <span className="burger-bar"></span>
          </button>
        )}
      </nav>
    </header>
  )
}