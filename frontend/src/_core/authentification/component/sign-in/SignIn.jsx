import "./SignIn.css";
import { Link } from "react-router-dom"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../../../_core/api/axios';
import { useState, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

const SIGNUP_URL = '/signup';
const LOGIN_URL = '/login';

const SignIn = () => {
    const { setAuth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const formik = useFormik({

        initialValues: {
            email: "",
            password: ""
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .required("Champ obligatoire"),
            password: Yup.string()
                .required("Champ obligatoire"),
        }),

        onSubmit: async (values) => {
            try {
                 const response = await axios.post(LOGIN_URL, 
                    JSON.stringify({email : values.email,
                                    password: values.password}),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                    console.log(JSON.stringify(response?.data));
                    /* history.push(SIGNIN_URL); */
                    
                    /*Optional chaining*/
                    const accessToken = response?.data?.accessToken;
                    const user = response?.data?.user;
                    const password = response?.data?.password;
                    console.log(accessToken);
                    /*Envoyer les roles du backend (it should be an array of roles) puis mettre roles dans objet SetAuth
                    const roles = response?.data?.roles;
                    */
                    setAuth({user, password, accessToken});
                     
            } catch (error) {
                setErrMsg("Veuillez entrer des identifiants valides.");
        
            }
        }
    });

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    return(
        <div className="LoginContainer">

            <h1>Bienvenu sur Quiz & Learn</h1>

            <br/>

            <h2> Se Connecter</h2>

            <form onSubmit={formik.handleSubmit}>

                <div className="field">
                    <label htmlFor="email">E-mail</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            autoComplete="on" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value = {formik.values.email}
                            maxLength="24"
                            aria-describedby="error" 
                        />
                    {formik.touched.email && formik.errors.email ? 

                        <span className="errorMessage">
                            <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                            <p id="error">{formik.errors.email}</p>
                        </span> : null}
                </div>

                <div className={`${"field"} ${"passwordContainer"}`}>
                    <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            name="password"
                            autoComplete="on"
                            type={passwordShown ? "text" : "password"}
                            className={"input"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value = {formik.values.password}
                            maxLength="24"
                            aria-describedby="error"
                        />

                        <button onClick={togglePasswordVisiblity} className="passwordEye">
                                <FontAwesomeIcon icon={faEye} className="eye"/>
                        </button>

                    {formik.touched.password && formik.errors.password ? 

                        <span className="errorMessage">
                            <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                            <p id="error">{formik.errors.password}</p>
                        </span> : null}
                </div>

                <div className="buttonContainer">
                    <input className="button" type="button" value="Log In"/>
                </div>

                {errMsg && 
                    <span className="errorMessage">
                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />  
                        <p id="accountError">{errMsg}</p>
                    </span>}
            </form>

            <br/>
            <p>Nouveau sur la plateforme ? Inscris-toi ici :<Link to={SIGNUP_URL}>Sign Up</Link></p>
        </div>
    );

}

export default SignIn;