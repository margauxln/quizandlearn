import './QuizCreation.css';
import { useFormik, FormikProvider, FieldArray } from 'formik';
import { faX } from '@fortawesome/free-solid-svg-icons';
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
                                answerContent: "",
                                isChecked: false
                            },
                            { 
                                answerContent: "",
                                isChecked: false
                            }
                        ]
                    }
                ]
            }
        });

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
                            value = {formik.values.title}
                            maxLength="24"
                            placeholder = "Titre questionnaire"
                        />
                    </div>

                    {/*Description*/}
                    <textarea
                        name="description"
                        className="textarea"
                        placeholder="Description"
                        rows="4"
                        type="text"
                        value = {formik.values.description}
                        >
                    </textarea>

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
                    
                </div>

                <FieldArray name="questions">

                    {({ push, remove }) => (
                        <>
                    {/*pour voir les valeurs : */}
                       {JSON.stringify(formik.values.questions)}

                            {(formik.values.questions.length > 0) &&
                            formik.values.questions.map((questionTitle, index)=>(

                                
                                <div className="sectionContainer" key={index}>
                                    <button 
                                        className="button deleteQuestion"
                                        type="button" 
                                        onClick={() => remove(index) //Supprimer une question
                                    }> <FontAwesomeIcon icon={faX} className="removeQuestionIcon"/> </button>  
                                    <p className="questionNumber" >Question {index + 1}</p>

                                    {/*Question Title*/}
                                    <div className="field">
                                        <label htmlFor={`questions.${index}.questionTitle`} className="sr-only"></label>
                                        <input
                                            id={`questions.${index}.questionTitle`}
                                            name={`questions.${index}.questionTitle`}
                                            type="text"
                                            className="input"
                                            maxLength="24"
                                            placeholder = "Titre Question"
                                            value={formik.values.questions[index].questionTitle}
                                            onChange={formik.handleChange}
                                        />
                                    </div>

                                    <FieldArray name={`questions.${index}.answers`}>

                                        {({ push, remove }) => ( 
                                            <>
                                            {questionTitle  && questionTitle.answers && questionTitle.answers.map((answer, idx)=>(
                                                <div className="answerAndDelete" key={idx}>
                                                <div className="field" id="replyField">
                                                    <label htmlFor={`${index}.${idx}`} className="sr-only"></label>
                                                    <input
                                                        id={`${index}.${idx}`}
                                                        name={`${index}.${idx}`}
                                                        type="text"
                                                        className="input answer"
                                                        maxLength="24"
                                                        placeholder = "réponse"
                                                    />            
                                                    <label class="checkbox" htmlFor="bonneReponse">
                                                        <input 
                                                            type="checkbox"
                                                            id="bonneReponse"
                                                            onChange=""

                                                        />
                                                        bonne réponse
                                                    </label>
                                                </div>
                                                {questionTitle && questionTitle.answers.length > 2 &&
                                                <button 
                                                    className="button removeAnswer"
                                                    type="button" 
                                                    onClick={() => remove(idx)}
                                                >X</button>}
                                            </div>
                                            ))}

                                            <div className="buttonContainer addAnswerContainer">
                                                {questionTitle  && questionTitle.answers && (questionTitle.answers.length < answerLimit) &&
                                                    <input 
                                                        className="button addAnswer"
                                                        type="button" 
                                                        value="Ajouter une réponse"
                                                        onClick={() => push(
                                                            { 
                                                                answerContent: "",
                                                                isChecked: false
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
                                                answerContent: "",
                                                isChecked: false
                                            },
                                            {
                                                answerContent: "",
                                                isChecked: false
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