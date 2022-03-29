import "./LogIn.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../config/axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoBlue from '../../assets/logoBlue.png';
import { useLogIn } from "../../hooks/useLogIn";

const SIGNUP_URL_FRONTEND = '/signup';

const LogIn = () => {   
    //entre {} car ça retournait un objet
    const {login} = useLogIn();

    const [errMsg, setErrMsg] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

    const formik = useFormik({
        //Le state d'email et password est initalisé à "" - on utilise la librairie UseFormik
        initialValues: {
            email: "",
            password: ""
        },

        //erreurs qui vont s'afficher (Yup est une librairie qui marche avec Formik)
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Champ obligatoire"),
            password: Yup.string()
                .required("Champ obligatoire"),
        }),

        //Submit du formulaire au serveur
        onSubmit: async (values) => {
            login(values, (message) => {
                setErrMsg(message);
            });
        }
    });

    //Usestate pour voir ou ne pas voir le mot de passe
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    return(
        <div className="loginContainer">

            <br/>
            <img src={LogoBlue} className="logo"alt=""></img>  
            <h1 id="SeConnecter"> Se Connecter</h1>

            <form onSubmit={formik.handleSubmit}>

                <div className="field">
                    <label htmlFor="email" className="sr-only">E-mail</label>
                        <input 
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            autoComplete="on" 
                            onChange={formik.handleChange}
                            //handleBlur permet de montrer à l'utilisateur les erreurs quand il se trouve dans le champs
                            //sans attendre qu'il ait submit le formulaire
                            onBlur={formik.handleBlur}
                            value = {formik.values.email}
                            maxLength="24"
                            aria-describedby="error"
                            placeholder = "E-mail" 
                        />
                    {/* Si la personne se trouve dans le champs et il y a des erreurs dans l'e-mail, alors on verra les erreurs*/}
                    {formik.touched.email && formik.errors.email ? 

                        <span className="errorMessage">
                            <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                            <p id="error">{formik.errors.email}</p>
                        </span> : null}
                </div>

                <div className={`${"field"} ${"passwordContainer"}`}>
                    <label htmlFor="password" className="sr-only">Password</label>
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
                            placeholder="password"
                        />

                        <button id="passwordEye" onClick={togglePasswordVisiblity} >
                                <FontAwesomeIcon icon={faEye} className="eye"/>
                        </button>

                    {formik.touched.password && formik.errors.password ? 

                        <span className="errorMessage">
                            <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                            <p id="error">{formik.errors.password}</p>
                        </span> : null}
                </div>

                <div className="buttonContainer">
                    <input 
                        className={`${"button"} ${"submitButton"}`} 
                        type="submit" value="Log In"/>
                </div>
                {/*Messages d'erreurs du serveur ou mauvais identifiants: */}
                {errMsg && 
                    <span className="errorMessage">
                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />  
                        <p id="accountError">{errMsg}</p>
                    </span>}
            </form>

            <br/>
            <p>Nouveau sur la plateforme ? </p> 
            <Link to={SIGNUP_URL_FRONTEND} className="linkToOtherPage">Inscrivez- </Link>
        </div>
    );

}

export default LogIn;