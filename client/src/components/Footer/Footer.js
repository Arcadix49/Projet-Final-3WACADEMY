import './footer.css'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai'

export const Footer = () => {

    return (
        <footer>
            <div className="footer">
                <button className='btn-footer'>Contact</button>
                <div className="lg">
                    <ul>
                        <li><BsFacebook /></li>
                        <li><AiFillTwitterCircle /></li>
                        <li><AiFillInstagram /></li>
                    </ul>
                </div>
            </div>

        </footer>
    )
}