import "./Login.css";
import { Link } from "react-router-dom"; 

const Login = () => {

    return(
        <div className="LoginContainer">

            <h1>Bienvenu sur Quiz & Learn</h1>
            
            <br/>

            <h2> Se Connecter</h2>

            <form>
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                        <input className="input" type="email" autoComplete="on" />
                </div>

                <div className="field">
                    <label htmlFor="password">Password</label>
                        <input className="input" type="password" autoComplete="on" />
                </div>

                <div className="buttonContainer">
                    <input className="button" type="submit" value="Submit"/>
                </div>

            </form>

            <br/>

            <div className="buttonContainer">
                <h2>Nouveau sur la plateforme ? Inscris-toi ici :</h2>
                <button class="button is white"><Link to="/signup">Sign Up</Link></button>
            </div>

        </div>
    );

}

export default Login;