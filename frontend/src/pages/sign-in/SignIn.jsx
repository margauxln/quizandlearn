import "./SignIn.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../api/axios';
import { useState } from 'react';
import useAuth from "../../hooks/UseAuth";
import { Link, useNavigate } from 'react-router-dom';
import LogoBlue from '../../assets/logoBlue.png';

const EXPLORE_URL_FRONTEND = '/explore';
const SIGNUP_URL_FRONTEND = '/signup';
const LOGIN_URL_BACKEND = '/login';

const SignIn = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

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
                 const response = await axios.post(LOGIN_URL_BACKEND, 
                    JSON.stringify({email : values.email,
                                    password: values.password}),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });
                    /* console.log(JSON.stringify(response.data));*/

                    const accessToken = response.data.token;
                    setAuth({user : values.email, password: values.password, accessToken});

                    localStorage.setItem('user', values.email);
                    localStorage.setItem('password', values.password);
                    localStorage.setItem('acceSSToken', accessToken);
                    console.log(localStorage);

                    values.email = "";
                    values.password = "";
                    navigate(EXPLORE_URL_FRONTEND);
                     
            } catch (error) {
                if (!error.response) {
                    setErrMsg('Aucune réponse du server');

                } else if (error.response.status === 401) {
                    setErrMsg("Veuillez entrer des identifiants valides");
                }
            }
        }
    });

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
                    <label htmlFor="email"  className="sr-only">E-mail</label>
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
                            placeholder = "E-mail" 
                        />
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

                {errMsg && 
                    <span className="errorMessage">
                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />  
                        <p id="accountError">{errMsg}</p>
                    </span>}
            </form>

            <br/>
            <p>Nouveau sur la plateforme ? </p> 
            <Link to={SIGNUP_URL_FRONTEND} className="linkToOtherPage">Inscrivez-vous</Link>
        </div>
    );

}

export default SignIn;