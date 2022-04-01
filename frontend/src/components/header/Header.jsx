import LogoBlue from '../../assets/logoBlue.png';
import profile from '../../assets/profile.png';
import "./Header.css";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const {logout, user} = useAuth();
    console.log('user',user);
    return (
        <div className='header'>
            <nav>
                <section className="upperPartHeaderContainer">
                    <img src={LogoBlue} className="logoHeader" alt=""/>
                    {/*Search bar Bulma*/}  
                    <div className="searchBar">
                        <input className="input" 
                            type="text" 
                            placeholder="Search"/>
                    </div>
                    <div className="logoutAndProfile">
                        <button className="button" onClick={logout}>Log Out </button>
                        <div className="profile">
                            <figure className="image is-64x64">
                                <img className="is-rounded" src={profile} alt="Profile" />
                            </figure>
                            <h6>Firstname</h6>
                        </div>
                    </div>
                </section>
            </nav>
            <section className='menuContainer'>
                    <div className="navbar-start">
                        <a className="navbar-item" href={useNavigate('/quizzes')}>
                            Explore
                        </a>
                        <a className="navbar-item">
                            Categories
                        </a>
                        <a className="navbar-item">
                            Create Quiz
                        </a>             
                        <a className="navbar-item">
                            My Quizzes
                        </a>
                        <a className="navbar-item">
                            Favorites Quizzes
                        </a>
                        <a className="navbar-item">
                            Completed Quizzes
                        </a>
                    </div>
            </section>
        </div>
    );
}

export default Header;