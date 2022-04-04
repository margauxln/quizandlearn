import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

const questionLimit = 4;

export const FriendList = () => (
  <div>
    <h1>Friend List</h1>
    <Formik
      initialValues={{ 
          quizTitle: "",
          quizDescription:"",
          quizCategory: "",
          questionTitle: "",
          otherAnswers: ["firstAnswer", "secondAnwer"], //max 2 en plus
          otherQuestions: [] }} //max 9

      render={({ values }) => (
        <Form>

            <FieldArray
                name="otherAnswers"
                render={arrayHelpers => (
                <div>
                    {(values.otherAnswers && values.otherAnswers.length > 0 && values.otherAnswers.length <= questionLimit) && (
                    values.otherAnswers.map((otherAnswer, index) => (
                        <div key={index}>
                        <Field name={`otherAnswers.${index}`} />
                        <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                            -
                        </button>
                        <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                        >
                            +
                        </button>
                        </div>
                        ))
                    )}
                    

                    <div>
                    <button type="submit">Submit</button>
                    </div>
                </div>
                )}
            />
        </Form>
      )}
    />
  </div>
);