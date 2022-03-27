import LogoBlue from '../../assets/logoBlue.png';
import "./Header.css";

const Header = () => {
    return (
        <nav>
            <section className="upperPartHeaderContainer">
                <img src={LogoBlue} className="logoHeader" alt=""/>

                {/*Search bar Bulma*/}  
                <div className="panel-block">
                    <input className="input is-link" 
                           type="text" 
                           placeholder="Search"/>
                </div>

                <div className="buttonContainertio">
                    <button>Log Out </button>
                </div>
                
                <div>C'est moi</div>
            </section>
        </nav>
    );
}

export default Header;