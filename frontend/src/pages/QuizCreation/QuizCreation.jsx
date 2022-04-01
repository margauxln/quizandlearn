import "./QuizCreation.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from '../../config/axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../../components/header/Header";

const QUIZCREATION_URL_FRONTEND = '/quizzes/quizCreation';
const QUIZCREATION_URL_BACKEND = '/quizzes/quizCreation';

const QuizCreation = () => {
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');
    const formik = useFormik({
        initialValues: {
            title: "",
            descritpion:"",
            categories: ""
        },
        validationSchema: Yup.object({
           title: Yup.string()
                .required("Champ obligatoire"),
            description: Yup.string()
                .required("Champ obligatoire"),
            categories: Yup.string()
                .required("Champ obligatoire")
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(QUIZCREATION_URL_BACKEND,
                    JSON.stringify({
                        title : values.title,
                        description: values.description,
                        categories: values.categories
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    });

                ///ajouter partie token si besoin

                //Ici on reinitialise les valeurs à zéro et, si on est bien authentifiées, on va à la page appelée dans
                //la fonction navigate
                values.title = "";
                values.description = "";
                values.categories = "";
                navigate(QUIZCREATION_URL_FRONTEND);

            } catch (error) {

            }
        }
    });

    return (
        <div className="quizCreationContainer">
            <h1>Creation Quiz!</h1>
            <form >
                <section>
                    <div className="field">
                        <label htmlFor="title"  className="sr-only">Titre questionnaire</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="input"
                            onChange={formik.handleChange}
                            //handleBlur permet de montrer à l'utilisateur les erreurs quand il se trouve dans le champs
                            //sans attendre qu'il ait submit le formulaire
                            onBlur={formik.handleBlur}
                            value = {formik.values.title}
                            maxLength="24"
                            aria-describedby="error"
                            placeholder = "Titre questionnaire"
                        />
                      {/*  /*    <span className="errorMessage">
                            <FontAwesomeIcon icon={faInfoCircle} className="errorIcon" />
                            <p id="error">{formik.errors.email}</p>
                        </span> : null}*/}
                    </div>

                    <textarea
                        name="descritpion"
                        className="textarea"
                        placeholder="Description"
                        type="text"
                        onChange={formik.handleChange}
                        //handleBlur permet de montrer à l'utilisateur les erreurs quand il se trouve dans le champs
                        //sans attendre qu'il ait submit le formulaire
                        onBlur={formik.handleBlur}
                        value = {formik.values.descritpion}
                       //maxLength="24"
                        aria-describedby="error"
                        >
                    </textarea>

                    <div className="select is-primary">
                        <select name="categories" id="category-select">
                            <option value="">--Please choose an option--</option>
                            <option value="tech">Tech</option>
                            <option value="feminisme">Feminisme</option>
                            <option value="ecologie">Ecologie</option>
                        </select>
                    </div>

                </section>
            </form>
        </div>
    );
}

export default QuizCreation;