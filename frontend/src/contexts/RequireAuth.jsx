import { useLogIn } from "../hooks/useLogIn";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//ici on veut voir si la session de l'utilisateur a expirée ou pas (session = 24h on le voit en back)
const RequireAuth = (props) => {

    const {user} = useLogIn();
    const navigate = useNavigate();

    const isValidToken = (token) => {

        token = jwt_decode(token);
        //Cet instant présent en millisecondes
        const now = Math.floor(Date.now() / 1000);

        if(token){
            //si l'expiration du token est supérieure à maintenant
            if (token.exp > now) {
                return true;
            }
        }

        return false;
    };

    //Si le token n'est plus valide => l'utilisateur sera redirigé vers la page log in
    // useEffect hook avec [] à la fin => signifie que cette fonction sera déclanchée au rechargement de la page (par l'utilisateur)
    useEffect(() => {
        if(isValidToken(user.token) === false) {
            navigate('/login');
        }
    }, []);
    
    //ça affiche les élements html contenues dans ce composant
    //ça retourne tous les enfants de l'application = cette fonction est appliquée partout ???
    return(
        <>
            {props.children}
        </>
        
    )
};

export default RequireAuth;