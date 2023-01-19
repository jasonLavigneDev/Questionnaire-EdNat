import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';

export const AnswersPage = () => {
  const formFromBDD = useLoaderData();
  const finalArray = [];

  formFromBDD.components.forEach((component) => {
    finalArray.push({
      questionTitle: component.title,
      questionId: component.id,
      responses: [],
    });
  });

  formFromBDD.formAnswers.forEach((userAnswer) => {
    finalArray.forEach((questionObj) => {
      const questionId = questionObj.questionId;
      const response = userAnswer.answers
        .filter((answer) => answer.questionId === questionId)
        .map((answer) => answer.answer);
      questionObj.responses.push({ response, userName: userAnswer.userId });
    });
  });

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Page de la reponse</h1>

      {finalArray.map((question) => (
        <div>
          <h3>Question : {question.questionTitle}</h3>
          <div>
            {question.responses.map((response) => (
              <div>
                <p>
                  <b>{response.userName} </b>: {response.response}
                </p>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </>
  );
};

export const loaderAnswerPage = async ({ params }) => {
  return await Meteor.callAsync('forms.getOne', params.id);
};
