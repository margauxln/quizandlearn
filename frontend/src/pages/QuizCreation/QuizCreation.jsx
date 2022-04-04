import "./QuizCreation.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const QuizCreation = () => {
    const[newAnswer, setNewAnswer] = useState(false);

    const addNewAnswer = (e) => {
        console.log(newAnswer);
        setNewAnswer(true);
        console.log(newAnswer);
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            description:"",
            categories: "",
            questionTitle: "",
            reply1: "",
            reply2: "",
            reply3: ""
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
            reply1: Yup.string()
                .required("Champ obligatoire"),
            reply2: Yup.string()
                .required("Champ obligatoire"),
            reply3: Yup.string()
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
                                <label HTMLlFor="reply1" className="sr-only"></label>
                                <input
                                    id="reply1"
                                    name="reply1"
                                    type="text"
                                    className="input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.reply1}
                                    maxLength="24"
                                    placeholder = "Réponse possible 1"
                                />

                            {formik.touched.reply1 && formik.errors.reply1 ?
                                <span className="errorMessageQuizCreationContainer">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                    <p className="errorContentQuizCreation">{formik.errors.reply1}</p>
                                </span> : null}
                            
                                <label class="checkbox">
                                    <input type="checkbox"/>
                                    bonne réponse
                                </label>
                            </div>

                            {/*Reply 2*/}
                            <div className="field" id="replyField">
                                <label HTMLlFor="reply2" className="sr-only"></label>
                                <input
                                    id="reply2"
                                    name="reply2"
                                    type="text"
                                    className="input"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value = {formik.values.reply2}
                                    maxLength="24"
                                    placeholder = "Réponse possible 2"
                                />

                            {formik.touched.reply2 && formik.errors.reply2 ?
                                <span className="errorMessageQuizCreationContainer">
                                    <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                    <p className="errorContentQuizCreation">{formik.errors.reply2}</p>
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
                                    onClick={addNewAnswer}
                                />
                            </div>

                            {/*On veut rajouter une réponse*/}
                            {(newAnswer === true) &&
                                <div>
                                    <div className="field" id="replyField">
                                    <label HTMLlFor="reply3" className="sr-only"></label>
                                    <input
                                        id="reply33"
                                        name="reply"
                                        type="text"
                                        className="input"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value = {formik.values.reply3}
                                        maxLength="24"
                                        placeholder = "Réponse possible 3"
                                    />

                                    {formik.touched.reply3 && formik.errors.reply3 ?
                                        <span className="errorMessageQuizCreationContainer">
                                            <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                                            <p className="errorContentQuizCreation">{formik.errors.reply3}</p>
                                        </span> : null}
                                    
                                        <label className="checkbox">
                                            <input type="checkbox"/>
                                            bonne réponse
                                        </label>
                                    </div>

                                    <div className="buttonContainer addQuestionContainer">
                                        <input 
                                            className="button addQuestion"
                                            type="button" 
                                            value="Ajouter une réponse"
                                            onClick={addNewAnswer}
                                        />
                                    </div>
                                </div>
                            }
                        </div>

                    </div>
                        

                </form>
            </div>
    );
}

export default QuizCreation;