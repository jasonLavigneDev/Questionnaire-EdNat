import React from 'react';
import { useLoaderData } from 'react-router-dom';

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
      let response = userAnswer.answers
        .filter((answer) => answer.questionId === questionId)
        .map((answer) => answer.answer);

      if (response[0] instanceof Array) {
        response = response[0].join(' - ');
      }

      questionObj.responses.push({ response, userName: userAnswer.userId });
    });
  });
  console.log('finalArray', finalArray);

  console.log('formFromBDD', formFromBDD);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Reponses du questionnaire : {formFromBDD.title}</h1>
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
