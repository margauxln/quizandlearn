import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';
//import { routesKeys } from '../config/routes';
import { errors } from '../config/forms';
import { actions, useStateValue } from '../providers/GlobalProvider';

export const useAuth = () => {
    const navigate = useNavigate();
    const [{user}, dispatch] = useStateValue();

    const login = async (values, onError) => {
        try {
            //la fonction axios.post à terme se trouvera dans le dossier services
             const response = await axios.post(api.user.login, 
                JSON.stringify({email : values.email,
                                password: values.password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });

                /* Si l'on veut bien voir la réponse du serveur : console.log(JSON.stringify(response.data));*/

                //Pour que le front comprenne qu'on est authentifié.e.s on appelle setAuth
                const accessToken = response.data.token;
                //setAuth({user : values.email, password: values.password, accessToken});

            
                const data = {
                    email: values.email,
                    token: accessToken
                };
                
                //locale storage n'accepte uniquement les chaînes de charactère (JSON.str convertit objet en chaîne)
                localStorage.setItem("user", JSON.stringify(data));
 
                // on met à jour le state global user
                //on passe par un provider/reducer = par la mise à jour d'un state pour rafraichir nos composants et pouvoir récupeérer instantanéement les données de l'utilisateur (localestorage à la main = recharger la page)
                dispatch({
                    action: actions.HANDLE_USER,
                    //data correspond à params.data
                    data: data
                });

                //Ici on reinitialise les valeurs à zéro et, si on est bien authentifiées, on va à la page appelée dans
                //la fonction navigate
                values.email = "";
                values.password = "";

                //navigate(routesKeys.EXPLORE);
                navigate("/quizzes");
                 
        } catch (error) {
            //on test que le 2e paramètre soit une fonction (on s'assure qu'il y ait un 2e argument et qu'il soit une fonction)
            if(typeof onError === "function") {
                if (!error.response) {
                    onError(errors.SERVER);
    
                } else if (error.response.status === 401) {
                    onError("Veuillez entrer des identifiants valides");
                }
            }
        }
    };

    return {
        user,
        login
    }

};