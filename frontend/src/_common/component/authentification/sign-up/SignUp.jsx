import './SignUp.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import axios from '../../../../_core/api/axios';
import { Link, useNavigate } from 'react-router-dom';
import LogoBlue from './logoBlue.png';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const SIGNUP_URL_BACKEND = '/signup';
const SIGNIN_URL_FRONTEND = '/signin';


const SignUp = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const formik = useFormik({

        initialValues: {
            name: "",
            surname : "",
            email: "",
            password: "",
            confirmPassword: ""
        },

        validationSchema: Yup.object({
            name: Yup.string()
                .max(45, "Prénom invalide")
                .required("Champ obligatoire"),
            surname: Yup.string()
                .max(45, "Nom invalide")
                .required("Champ obligatoire"),
            email: Yup.string()
                .email("Adress email invalide")
                .required("Champ obligatoire"),
            password: Yup.string()
                .matches(PASSWORD_REGEX, 'Le mot de passe doit contenir au minimum 8 caractères : au moins une lettre minuscule et une lettre majuscule, un caractère spécial et un chiffre')
                .required("Champ obligatoire"),
            confirmPassword: Yup.string()
                /*oneOf = equals to*/ 
                .oneOf([Yup.ref('password'), null], 'Les mots de passe saisis ne sont pas idéntiques')
                .required("Champ obligatoire")
        }),

        onSubmit: async (values) => {
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
                    navigate(SIGNIN_URL_FRONTEND );
                    
            } catch (error) {
                if (!error.response) {
                    setErrMsg('Aucune réponse du server');

                } else if (error.response.status === 400) {
                    setErrMsg("Vous avez déjà un compte, connectez-vous en utilisant le lien ci-dessous'");

                }
            }
        }
    });

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleConfirmedPasswordVisiblity = () => {
        setConfirmedPasswordShown(!confirmedPasswordShown);
    };

    return(
        <>
             <section className="signUpContainer">

                    <img src={LogoBlue} className="logo"alt=""></img>  
                    <h1>S'inscrire</h1>
                    <br/>

                    <form onSubmit={formik.handleSubmit}>

                        <div className="field">
                            <label htmlFor="name" className="sr-only">Prénom*</label>
                                <input 
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="on"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.name}
                                    aria-describedby="nameError"
                                    className="input"
                                    placeholder = "Prénom"  
                                />

                            {formik.touched.name && formik.errors.name ?

                                <span className="errorMessage">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                                    <p id="nameError">{formik.errors.name}</p> 
                                </span> : null}
                        </div>

                        <div className="field">
                            <label htmlFor="nom" className="sr-only">Nom</label>
                                <input 
                                    id="nom"
                                    name="surname"
                                    type="text"
                                    className="input"
                                    autoComplete="on"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.surname}
                                    aria-describedby="surNameError"
                                    placeholder="Nom"
                                />

                                {formik.touched.surname && formik.errors.surname ? 

                                    <span className="errorMessage">
                                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                                        <p id="surNameError">{formik.errors.surname}</p>
                                    </span> : null}
                        </div>

                        <div className="field">
                            <label htmlFor="email" className="sr-only">E-mail</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="input"
                                    autoComplete="on" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.email}
                                    aria-describedby="emailError"
                                    placeholder="E-mail"
                                />

                                {formik.touched.email && formik.errors.email ? 

                                    <span className="errorMessage">
                                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                                        <p id="emailError">{formik.errors.email}</p>
                                    </span> : null}
                        </div>

                        <div className={`${"field"} ${"passwordContainer"}`}>
                            <label htmlFor="password"></label>
                                <input 
                                    id="password"
                                    name="password"
                                    autoComplete="on"
                                    type={passwordShown ? "text" : "password"}
                                    className="input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.password}
                                    aria-describedby="passwordError"
                                    placeholder="Mot de passe"
                                />

                                <button onClick={togglePasswordVisiblity} className="passwordEye">
                                    <FontAwesomeIcon icon={faEye} className="eye"/>
                                </button>
                                
                                {formik.touched.password && formik.errors.password ? 

                                    <span className="errorMessage">
                                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                                        <p id="passwordError">{formik.errors.password}</p>
                                    </span> : null}
                        </div>

                        <div className={`${"field"} ${"confirmPasswordContainer"}`}>
                            <label htmlFor="password-confirmation" className="sr-only">Confirmation du mot de passe</label>
                                <input 
                                    id="password-confirmation"
                                    name="confirmPassword"
                                    type={confirmedPasswordShown ? "text" : "password"}
                                    className="input"
                                    autoComplete="on" 
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.confirmPassword}
                                    aria-describedby="confirmPasswordError"
                                    placeholder="Confirmation du mot de passe"
                                />
                                
                                <button onClick={toggleConfirmedPasswordVisiblity} className="confirmPasswordEye">
                                    <FontAwesomeIcon icon={faEye} className="eye"/>
                                </button>

                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? 

                                    <span className="errorMessage">
                                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />  
                                        <p id="confirmPasswordError">{formik.errors.confirmPassword}</p>
                                    </span> : null}
                                
                            {errMsg && 
                                <span className="errorMessage">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />  
                                    <p id="accountError">{errMsg}</p>
                                </span>}
                        </div>
                        
                        <div className="buttonContainer">
                            <input 
                                className={`${"button"} ${"submitButton"}`} 
                                type="submit" 
                                value="Inscription"
                            />
                        </div>
                        <br/>
                </form>
                    <p>Vous avez déjà un compte ?</p> 
                    <Link to={SIGNIN_URL_FRONTEND} className="linkToOtherPage"> Connectez-vous</Link>
                
            </section>
        </>     
    );
}

export default SignUp;