import { useAuth } from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Container = (props) => {

    const {user} = useAuth();
    const navigate = useNavigate();

    const isValidToken = (token) => {

        token = jwt_decode(token);

        const now = Math.floor(Date.now() / 1000);

        if(token){
            if (token.exp > now) {
                return true;
            }
        }

        return false;
    };

    // Au chargement du composant (chargement de page)
    useEffect(() => {
        if(!isValidToken(user.token)) {
            navigate('/login');
        }
    }, []);
    
    //ça affiche les élements html contenues dans ce composant
    return(
        <>
            {props.children}
        </>
        
    )
};

export default Container;