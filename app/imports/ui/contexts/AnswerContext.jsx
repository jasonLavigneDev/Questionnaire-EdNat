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
    const answerFormUpdated = { ...answerForm };
    const { answers } = answerFormUpdated;
    const index = answers.findIndex((answer) => answer.questionId === questionId);

    if (index === -1) {
      answers.push({ questionId, answer: value });
    } else {
      answers[index].answer = value;
    }

    setAnswerForm(answerFormUpdated);
  };

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

// retirer du contexte et mettre dans le seul composant qui l'utilise
