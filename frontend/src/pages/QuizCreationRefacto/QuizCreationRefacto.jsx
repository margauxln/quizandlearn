import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
  answers: [
    {
      name: '',
      email: '',
    },
  ],
};

const InviteFriends = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="answers">
            {({ insert, remove, push }) => (
              <div>
                {values.answers.length > 0 &&
                  values.answers.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`answers.${index}.name`}>Name</label>

                        <Field
                          name={`answers.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />

                        <ErrorMessage
                          name={`answers.${index}.name`}
                          component="div"
                          className="field-error"
                        />

                      </div>
                      <div className="col">
                        <label htmlFor={`answers.${index}.email`}>Email</label>

                        <Field
                          name={`answers.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />

                        <ErrorMessage
                          name={`answers.${index}.name`}
                          component="div"
                          className="field-error"
                        />

                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: '', email: '' })}
                >
                  Add Answer
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default InviteFriends;