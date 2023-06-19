import './layout.css'
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';

export const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="layout">
                {children}
            </div>
            <Footer />
        </>
    )
}