import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';
//import { routesKeys } from '../config/routes';
import { errors } from '../config/forms';
import { actions, useStateValue } from '../providers/GlobalProvider';

const SIGNUP_URL_BACKEND = '/signup';
const LOGIN_URL_FRONTEND = '/login';

export const useSignUp = () => {
    const navigate = useNavigate();

    const [{user}, dispatch] = useStateValue();

    const signup = async (values, onError) => {
        try {
            const response = await axios.post(SIGNUP_URL_BACKEND, 
                               JSON.stringify({name : values.name,
                                               surname: values.surname,
                                               email: values.email,
                                               password: values.password}),
                               {
                                   headers: { 'Content-Type': 'application/json' },
                                   withCredentials: true
                               });
                                     
               console.log(response.data);
               console.log(JSON.stringify(response));
               navigate(LOGIN_URL_FRONTEND );
               
       } catch (error) {
           if(typeof onError === "function") {
                if (!error.response) {
                    onError(errors.SERVER);

                } else if (error.response.status === 400) {
                    onError("Vous avez déjà un compte, connectez-vous en utilisant le lien ci-dessous");

                }
            }
        }
    };

    return {
        signup
    }
}