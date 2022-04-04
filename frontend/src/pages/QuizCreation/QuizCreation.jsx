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
            categories: "",
            questionTitle: "",
            reply: ""
        },
        validationSchema: Yup.object({
           title: Yup.string()
                .required("Champ obligatoire"),
            description: Yup.string()
                .required("Champ obligatoire"),
            categories: Yup.string()
                .required("Champ obligatoire"),
            questionTitle: Yup.string()
                .required("Champ obligatoire"),
            reply: Yup.string()
                .required("Champ obligatoire")
        }),
    });

    return (
            <div id="quizCreationPageContainer">

                <form id="quizCreationFormContainer">

                <h1 id="titleQuizCreation">Création de Quiz</h1>

                    <div className="sectionContainer">
                        {/*Title*/}
                        <div className="field">
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
                            rows="4"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value = {formik.values.description}
                            >
                        </textarea>

                        {formik.touched.description && formik.errors.description ?
                            <span className="errorMessageQuizCreationContainer">
                                <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                <p className="errorContentQuizCreation">{formik.errors.description}</p>
                            </span> : null}

                        {/*Select*/}
                        <div className="select is-warning" id="selectCategoriesContainer">
                            <select 
                                id="selectCategories" 
                                name="categories" 
                                value= {formik.values.categories}
                            >
                                <option value="" disabled>Thématique</option>
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
                    </div>

                    <div className="sectionContainer">
                        <p className="questionNumber" >Question 1</p>

                        {/*Question Title*/}
                        <div className="field">
                            <label HTMLlFor="questionTitle" className="sr-only"></label>
                            <input
                                id="questionTitle"
                                name="questionTitle"
                                type="text"
                                className="input"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value = {formik.values.questionTitle}
                                maxLength="24"
                                placeholder = "Titre Question"
                            />

                        {formik.touched.questionTitle && formik.errors.questionTitle ?
                            <span className="errorMessageQuizCreationContainer">
                                <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                <p className="errorContentQuizCreation">{formik.errors.questionTitle}</p>
                            </span> : null}
                        </div>

                        <div className="repliesContainer">
                            {/*Reply 1*/}
                            <div className="field" id="replyField">
                                <label HTMLlFor="reply" className="sr-only"></label>
                                <input
                                    id="reply"
                                    name="reply"
                                    type="text"
                                    className="input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.reply}
                                    maxLength="24"
                                    placeholder = "Réponse possible 1"
                                />

                            {formik.touched.reply && formik.errors.reply ?
                                <span className="errorMessageQuizCreationContainer">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                    <p className="errorContentQuizCreation">{formik.errors.reply}</p>
                                </span> : null}
                            
                                <label class="checkbox">
                                    <input type="checkbox"/>
                                    bonne réponse
                                </label>
                            </div>

                            {/*Reply 2*/}
                            <div className="field" id="replyField">
                                <label HTMLlFor="reply" className="sr-only"></label>
                                <input
                                    id="reply"
                                    name="reply"
                                    type="text"
                                    className="input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.reply}
                                    maxLength="24"
                                    placeholder = "Réponse possible 2"
                                />

                            {formik.touched.reply && formik.errors.reply ?
                                <span className="errorMessageQuizCreationContainer">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                    <p className="errorContentQuizCreation">{formik.errors.reply}</p>
                                </span> : null}
                            
                                <label class="checkbox">
                                    <input type="checkbox"/>
                                    bonne réponse
                                </label>
                            </div>

                            <div className="buttonContainer addQuestionContainer">
                                <input 
                                    className="button addQuestion"
                                    type="button" 
                                    value="Ajouter une réponse"
                                />
                            </div>
                        </div>

                    </div>
                        

                </form>
            </div>
    );
}

export default QuizCreation;