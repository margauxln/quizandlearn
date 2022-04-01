import "./QuizCreation.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QuizCreation = () => {

    const formik = useFormik({
        initialValues: {
            title: "",
            description:"",
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
    });

    return (
            <div id="quizCreationPageContainer">

                <form id="quizCreationFormContainer">

                <h1 id="titleQuizCreation">Création de Quiz</h1>

                        {/*Title*/}
                        <div className="field">
                            {/*?? sr-only ne marche pas ici*/}
                            <label HTMLlFor="title" className="sr-only"></label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="input"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value = {formik.values.title}
                                maxLength="24"
                                aria-describedby="error"
                                placeholder = "Titre questionnaire"
                            />

                        {formik.touched.title && formik.errors.title ?
                            <span className="errorMessageQuizCreationContainer">
                                <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                <p className="errorContentQuizCreation">{formik.errors.title}</p>
                            </span> : null}

                        </div>

                        {/*Description*/}
                        <textarea
                            name="description"
                            className="textarea"
                            placeholder="Description"
                            rows="6"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value = {formik.values.description}
                            aria-describedby="error"
                            >
                        </textarea>

                        {formik.touched.description && formik.errors.description ?
                            <span className="errorMessageQuizCreationContainer">
                                <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                <p className="errorContentQuizCreation">{formik.errors.description}</p>
                            </span> : null}

                        {/*Select*/}
                        <div className="select is-warning" id="selectCategoriesContainer">
                            <select id="selectCategories" name="categories">
                                <option value="">Thématique</option>
                                <option value="tech">Tech</option>
                                <option value="feminisme">Feminisme</option>
                                <option value="ecologie">Ecologie</option>
                            </select>
                        </div>
                        
                        {/*?? à vérifier si les messages d'erreur marchent*/}
                        {formik.touched.categories && formik.errors.categories ?
                            <span className="errorMessageQuizCreationContainer">
                                <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                <p className="errorContentQuizCreation">{formik.errors.categories}</p>
                            </span> : null}

                </form>
            </div>
    );
}

export default QuizCreation;