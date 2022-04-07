import "./QuizCreation.css";
import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const additionalRepliesLimit = 4;

const QuizCreation = () => {

    const formik = useFormik({
        initialValues: {
            title: "",
            description:"",
            categories: "",
            questionTitle: "",
            additionalReplies: [
            {
                reply1: ""
            },
            {
                reply2: ""
            }],
        },
        validationSchema: Yup.object({
           title: Yup.string()
                .required("Champ obligatoire"),
            description: Yup.string()
                .required("Champ obligatoire"),
            categories: Yup.string()
                .required("Champ obligatoire"),
            questionTitle: Yup.string()
                .required("Champ obligatoire")
        }),
    });

    return (
            <FormikProvider value={formik} id="quizCreationPageContainer">

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

                        <FieldArray name="additionalReplies">
                            {({ insert, remove }) => (

                                <div className="optionalRepliesContainer">

                                    {(formik.values.additionalReplies.length > 0 && formik.values.additionalReplies.length) &&
                                    formik.values.additionalReplies.map((reply, index)=>(
                                        <div className="answerAndDelete">
                                            <div className="field" id="replyField">
                                                <label HTMLlFor={`additionalReplies.${index}.reply`} className="sr-only"></label>
                                                <input
                                                    id={`additionalReplies.${index}.reply`}
                                                    name={`additionalReplies.${index}.reply`}
                                                    type="text"
                                                    className="input reply"
                                                    onChange={formik.handleChange}
                                                    onBlur= {formik.handleBlur}
                                                    maxLength="24"
                                                    placeholder = "autre réponse possible"
                                                />               
                                                <label class="checkbox">
                                                    <input type="checkbox"/>
                                                    bonne réponse
                                                </label>
                                            </div>
                                            <input 
                                                className="button removeQuestion"
                                                type="button" 
                                                value="X"
                                                onClick={() => remove({ reply:'' })}
                                            />
                                        </div>
                                    ))}

                                        <div className="buttonContainer addQuestionContainer">

                                            {(formik.values.additionalReplies.length < additionalRepliesLimit) &&
                                                <input 
                                                    className="button addQuestion"
                                                    type="button" 
                                                    value="Ajouter une réponse"
                                                    onClick={() => insert({ reply:'' })}
                                                />}

                                        </div>
   
                                </div>

                            )}

                        </FieldArray>
                    </div>
                    

                </form>
            </FormikProvider>
    );
}

export default QuizCreation;