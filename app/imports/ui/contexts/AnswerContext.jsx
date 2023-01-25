// import React, { createContext, useState } from 'react';

// const initialState = {
//   userId: '',
//   formId: '',
//   answers: [],
// };

// export const AnswerContext = createContext(initialState);

// export const AnswerProvider = ({ children }) => {
//   const [answerForm, setAnswerForm] = useState(initialState);

//   const addAnswers = (questionId, value) => {
//     const newObj = { ...answerForm };
//     const { answers } = newObj;
//     const index = answers.findIndex((o) => o.questionId === questionId);

//     if (index === -1) {
//       answers.push({ questionId, answer: value });
//     } else {
//       answers[index].answer = value;
//     }

//     setAnswerForm(newObj);
//   };

//   return (
//     <AnswerContext.Provider
//       value={{
//         answerForm,
//         setAnswerForm,
//         addAnswers,
//       }}
//     >
//       {children}
//     </AnswerContext.Provider>
//   );
// };
