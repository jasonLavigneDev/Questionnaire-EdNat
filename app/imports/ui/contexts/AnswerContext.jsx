import React, { createContext, useState } from 'react';

const initialState = {
  userId: '',
  formId: '',
  answers: [],
};

export const AnswerContext = createContext(initialState);

export const AnswerProvider = ({ children }) => {
  const [answerForm, setAnswerForm] = useState(initialState);

  const addAnswers = (questionId, value) => {
    const newObj = { ...answerForm };
    const { answers } = newObj;
    let toModify = false;
    let pos = null;

    if (answers.length !== 0) {
      answers.forEach((answer, index) => {
        if (answer.questionId === questionId) {
          toModify = true;
          pos = index;
        }
      });
    }

    if (toModify) {
      answers[pos].answer = value;
    } else {
      answers.push({ questionId, answer: value });
    }

    setAnswerForm(newObj);
  };

  console.log('ANSWER CONTEXT', answerForm);

  return (
    <AnswerContext.Provider
      value={{
        answerForm,
        setAnswerForm,
        addAnswers,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};
