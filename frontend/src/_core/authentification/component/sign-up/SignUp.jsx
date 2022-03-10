import './SignUp.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';

const NAME_SURNAME_REGEX = /^[a-zA-Z]+ [a-zA-Z]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
    const [passwordShown, setPasswordShown] = useState(false);

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
                .max(24, "Prénom invalide")
                .matches(NAME_SURNAME_REGEX, 'Prénom invalide')
                .required("Champ obligatoire"),
            surname: Yup.string()
                .max(24, "Nom de famille invalide")
                .matches(NAME_SURNAME_REGEX, 'Nom de famille invalide')
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

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
          },
    });

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    return(
        <>
            <section className="SignUpContainer">  
                <h1>Bienvenu sur Quiz & Learn</h1>
                <br/>
                
                <h2>S'inscrire</h2>

                <form onSubmit={formik.handleSubmit}>

                    <div className="field">
                        <label htmlFor="name">Prénom*</label>
                            <input  id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="on"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.name}
                                    maxLength="24"
                                    aria-describedby="nameError"
                                    className="input"
                            />

                        {formik.touched.name && formik.errors.name ?

                            <span className="errorMessage">
                                <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                                <p id="nameError">{formik.errors.name}</p> 
                            </span> : null}
                    </div>

                    <div className="field">
                        <label htmlFor="nom">Nom*</label>
                            <input id="nom"
                                   name="surname"
                                   type="text"
                                   className="input"
                                   autoComplete="on"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value = {formik.values.surname}
                                   maxLength="24"
                                   aria-describedby="surNameError" 
                            />

                            {formik.touched.surname && formik.errors.surname ? 

                                <span className="errorMessage">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                                    <p id="surNameError">{formik.errors.surname}</p>
                                </span> : null}
                    </div>

                    <div className="field">
                        <label htmlFor="email">E-mail*</label>
                            <input id="email"
                                   name="email"
                                   type="email"
                                   className="input"
                                   autoComplete="on" 
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value = {formik.values.email}
                                   maxLength="24"
                                   aria-describedby="emailError" 
                            />

                            {formik.touched.email && formik.errors.email ? 

                                <span className="errorMessage">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" /> 
                                    <p id="emailError">{formik.errors.email}</p>
                                </span> : null}
                    </div>

                    <div className={`${"field"} ${"passwordContainer"}`}>
                        <label htmlFor="password">Mot de passe*</label>
                            <input id="password"
                                   name="password"
                                   autoComplete="on"
                                   type={passwordShown ? "text" : "password"}
                                   className={"input"}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value = {formik.values.password}
                                   maxLength="24"
                                   aria-describedby="passwordError"
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
                        <label htmlFor="password-confirmation">Confirmation du mot de passe**</label>
                            <input id="password-confirmation"
                                   name="confirmPassword"
                                   type="password"
                                   className="input"
                                   autoComplete="on" 
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value = {formik.values.confirmPassword}
                                   maxLength="24"
                                   aria-describedby="confirmPasswordError"
                            />
                            
                            <button onClick={togglePasswordVisiblity} className="confirmPasswordEye">
                                <FontAwesomeIcon icon={faEye} className="eye"/>
                            </button>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? 

                                <span className="errorMessage">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />  
                                    <p id="confirmPasswordError">{formik.errors.confirmPassword}</p>
                                </span> : null}
                    </div>
                    
                    <div className="buttonContainer">
                        <input className="button" type="submit" value="Submit"/>
                    </div>
                </form>
            </section> 
        </>     
    );
}

export default SignUp;