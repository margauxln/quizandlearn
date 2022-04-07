import "./QuizCreation.css";
import { useFormik, FormikProvider, FieldArray, Field,} from "formik";
import * as Yup from "yup";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const questionLimit = 10;
const answerLimit = 4;

const QuizCreation = () => {

    const formik = useFormik({
        initialValues: {
            title: "",
            description:"",
            categories: "",
            questions: [
                {
                    questionTitle: "",
                    answers: [
                        { 
                            label: "" 
                        },
                        { 
                            label: "" 
                        }
                    ],
                }
        ]
            
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
            <FormikProvider value={formik} id="quizCreationPageContainer">

                <form id="quizCreationFormContainer">

                <h1 id="titleQuizCreation">Création de Quiz</h1>

                    <div className="sectionContainer">
                        {/*Title*/}
                        <div className="field">
                            <label htmlFor="title" className="sr-only"></label>
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

                    <FieldArray name="questions">

                        {({ push, remove }) => (
                            <>
                            {/* {JSON.stringify(formik.values.questions)} */}

                                {(formik.values.questions.length > 0 && formik.values.questions.length) &&
                                formik.values.questions.map((question, index)=>(

                                    <div className="sectionContainer" key={index}>
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

                                            {({ push, remove}) => ( 
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
                                                            placeholder = "autre réponse possible"
                                                        />               
                                                        <label class="checkbox">
                                                            <input type="checkbox"/>
                                                            bonne réponse
                                                        </label>
                                                    </div>
                                                    <button 
                                                        className="button removeAnswer"
                                                        type="button" 
                                                        value="X"
                                                        onClick={() => remove(idx)}
                                                    />
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
                                                                })
                                                            }
                                                        />}
                                                </div>   
                                                </>
                                            )}

                                        </FieldArray>        
                                    </div>
                                ))}
                                
                                <>
                                {(formik.values.questions.length  < questionLimit) &&

                                    <input 
                                    className="button addQuestion"
                                    type="button" 
                                    value="Ajouter une question"
                                    onClick={() => push({ 
                                        questionTitle:'', 
                                        answers:[
                                            {
                                                label: ""
                                            },
                                            {
                                                label: ""
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
    );
}

export default QuizCreation;