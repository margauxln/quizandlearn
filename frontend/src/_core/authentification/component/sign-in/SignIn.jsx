import "./SignIn.css";
import { Link, useHistory } from "react-router-dom"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../../../../_core/api/axios';
import { useState, useContext } from 'react';
import AuthContext from "../context/AuthProvider";

const SIGNUP_URL_FRONTEND = '/signup';
const LOGIN_URL_BACKEND = '/login';

const SignIn = () => {
    const { setAuth } = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const history = useHistory();

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
                    console.log(JSON.stringify(response.data));
                    console.log(JSON.stringify(response));  

                    const accessToken = response.data.token;
                    console.log(JSON.stringify(accessToken));

                    setAuth({email : values.email, password: values.password, accessToken});

                    history.push(SIGNUP_URL_FRONTEND);
                     
            } catch (error) {
                if (!error.response) {
                    setErrMsg('Aucune réponse du server');

                } else if (error.response.status === 401) {
                    setErrMsg("Veuillez entrer des identifiants valides");

                } else if (error.response.status === 204) {
                    setErrMsg("No data");
                }
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
                    <input className="button" type="submit" value="Log In"/>
                </div>

                {errMsg && 
                    <span className="errorMessage">
                        <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />  
                        <p id="accountError">{errMsg}</p>
                    </span>}
            </form>

            <br/>
            <p>Nouveau sur la plateforme ? Inscris-toi ici :<Link to={SIGNUP_URL_FRONTEND}>Sign Up</Link></p>
        </div>
    );

}

export default SignIn;