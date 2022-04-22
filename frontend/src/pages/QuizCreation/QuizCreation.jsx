import './QuizCreation.css';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import * as Yup from "yup";
import { faInfoCircle, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const questionLimit = 5;
const answerLimit = 4;

const QuizCreation = () => {

    const formik = useFormik({
        //Objet initial qu'on voit dessiné sur le DOM
        initialValues: {
            title: "",
            description:"",
            categories: "",
            questions: [
                {
                    questionTitle: "",
                    answers: [
                        //On voit 2 objets réponses
                        { 
                            content: ""
                        },
                        { 
                            content: "" 
                        }
                    ]
                }
            ]
        },
        validationSchema: Yup.object({
           title: Yup.string()
                .required("Champ obligatoire"),
            description: Yup.string()
                .required("Champ obligatoire"),
            categories: Yup.string()
                .required("Champ obligatoire"),
            /* questionTitle: Yup.string()
                .required("Champ obligatoire"),
            content: Yup.array()
                .required("Champ obligatoire") */
        }),
    });
    //https://stackoverflow.com/questions/55793229/no-yup-validation-errors-found-by-formik-in-array-of-objects

    return (
        <div className="quizCreationPageContainer">
            <FormikProvider value={formik}>

            <form id="quizCreationFormContainer">

            <h1 id="titleQuizCreation">Création de Quiz</h1>

                <div className="sectionContainer">
                    {/*Title*/}
                    <div className="field">
                        <label htmlFor="title" className="sr-only">Title</label>
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value= {formik.values.categories}
                        >
                            <option value="" disabled>Thématique</option>
                            <option value="tech">Tech</option>
                            <option value="feminisme">Feminisme</option>
                            <option value="ecologie">Ecologie</option>
                        </select>
                    </div>
                    
                    {formik.touched.categories && formik.errors.categories ?
                        <span className="errorMessageQuizCreationContainer">
                            <FontAwesomeIcon icon={faInfoCircle} className="errorIconQuizCreation" />
                            <p className="errorContentQuizCreation">{formik.errors.categories}</p>
                        </span> : null}
                </div>

                <FieldArray name="questions">

                    {({ push, remove }) => (
                        <>
                        {/* Pour voir les values : {JSON.stringify(formik.values.questions)} */}

                            {(formik.values.questions.length > 0) &&
                            formik.values.questions.map((question, index)=>(

                                
                                <div className="sectionContainer" key={index}>
                                    <button 
                                        className="button deleteQuestion"
                                        type="button" 
                                        onClick={() => remove(index) //Supprimer une question
                                    }> <FontAwesomeIcon icon={faX} className="removeQuestionIcon"/> </button>  
                                    <p className="questionNumber" >Question {index + 1}</p>

                                    {/*Question Title*/}
                                    <div className="field">
                                        <label htmlFor={`questions.${index}.question`} className="sr-only"></label>
                                        <input
                                            id={`questions.${index}.question`}
                                            name={`questions.${index}.question`}
                                            type="text"
                                            className="input"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            maxLength="24"
                                            placeholder = "Titre Question"
                                        />

                                    </div>

                                    <FieldArray name={`questions.${index}.answers`}>

                                        {({ push, remove }) => ( 
                                            <>
                                            {question  && question.answers && question.answers.map((answer, idx)=>(
                                                <div className="answerAndDelete" key={idx}>
                                                <div className="field" id="replyField">
                                                    <label htmlFor={`${index}.${idx}`} className="sr-only"></label>
                                                    <input
                                                        id={`${index}.${idx}`}
                                                        name={`${index}.${idx}`}
                                                        type="text"
                                                        className="input answer"
                                                        onChange={formik.handleChange}
                                                        onBlur= {formik.handleBlur}
                                                        maxLength="24"
                                                        placeholder = "réponse"
                                                    />               
                                                    <label class="checkbox" htmlFor="bonneReponse">
                                                        <input 
                                                            type="checkbox"
                                                            id="bonneReponse"
                                                            value={formik.bonneReponse}
                                                            onChange={formik.handleChange}
                                                            onBlur= {formik.handleBlur}
                                                        />
                                                        bonne réponse
                                                    </label>
                                                </div>
                                                {question && question.answers.length > 2 &&
                                                <button 
                                                    className="button removeAnswer"
                                                    type="button" 
                                                    onClick={() => remove(idx)}
                                                >X</button>}
                                            </div>
                                            ))}

                                            <div className="buttonContainer addAnswerContainer">
                                                {question  && question.answers && (question.answers.length < answerLimit) &&
                                                    <input 
                                                        className="button addAnswer"
                                                        type="button" 
                                                        value="Ajouter une réponse"
                                                        onClick={() => push(
                                                            { 
                                                                answer:'' 
                                                            }
                                                        )}
                                                    />}
                                            </div>   
                                            </>
                                        )}

                                    </FieldArray> 
                                </div>
                            ))}
                            
                            <>
                                {(formik.values.questions.length < questionLimit) &&

                                    <input 
                                    className="button addQuestion"
                                    type="button" 
                                    value="Ajouter une question"
                                    onClick={() => push({ 
                                        questionTitle:'', 
                                        answers:[
                                            {
                                                content: ""
                                            },
                                            {
                                                content: ""
                                            }
                                        ] 
                                    })
                                    }

                                />}
                            </>

                        </>
                    )}  
                </FieldArray>

            </form>
            </FormikProvider>

        </div>
    );
}

export default QuizCreation;