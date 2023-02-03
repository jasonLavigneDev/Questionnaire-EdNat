import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

// Cette page est a refactor !

export const AnswersPage = () => {
  const formFromBDD = useLoaderData();
  const finalArray = [];
  const statArray = [];
  const [statMode, setStatMode] = useState(false);

  const navigate = useNavigate();

  formFromBDD.components.forEach((component) => {
    finalArray.push({
      questionTitle: component.title,
      questionId: component.id,
      questionType: component.type,
      responses: [],
    });
  });

  formFromBDD.formAnswers?.forEach((userAnswer) => {
    finalArray.forEach((questionObj) => {
      const questionId = questionObj.questionId;
      let response = userAnswer.answers
        .filter((answer) => answer.questionId === questionId)
        .map((answer) => answer.answer);

      if (response[0] instanceof Array) {
        response = response[0].join(' - ');
      }

      questionObj.responses.push({
        response,
        userName: userAnswer.userId,
        createdAt: userAnswer.createdAt.toLocaleDateString(),
      });
    });
  });

  const CanHaveStat = (type) => {
    if (type !== 'textInput' && type !== 'textArea') return true;
    return false;
  };

  finalArray.map((question) => {
    if (CanHaveStat(question.questionType)) {
      const stat = [];
      question.responses.map((response) => {
        const index = stat.findIndex((res) => response.response[0] === res.answer);
        if (index !== -1) {
          stat[index].count++;
        } else {
          stat.push({ answer: response.response[0], count: 1 });
        }
      });
      statArray.push({ questionTitle: question.questionTitle, questionId: question.questionId, stat: stat });
    }
  });
  const hasNotAnswers = () => {
    if (!formFromBDD.formAnswers || formFromBDD.formAnswers.length === 0) return true;
    return false;
  };

  const getAllCountStat = (stats) => {
    let cpt = 0;
    stats.map((stat) => {
      cpt += stat.count;
    });
    return cpt;
  };

  return (
    <>
      {hasNotAnswers() ? (
        <>
          <p>Il n'y a pas de reponses</p>
          <Button onClick={() => navigate('/')}>Retour </Button>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Reponses du questionnaire : {formFromBDD.title}</h1>
          <Button onClick={() => setStatMode(!statMode)}>
            {statMode ? 'Voir les réponses par utilisateur' : 'Voir les Statistiques'}
          </Button>
          {statMode
            ? statArray.map(
                (
                  question, // possible de ceer un composant stat
                ) => (
                  <div>
                    <h2>{question.questionTitle}</h2>
                    {question.stat.map((stat) => (
                      <ul>
                        <li>
                          <b>{stat.answer} </b>: {(stat.count / getAllCountStat(question.stat)) * 100}%
                        </li>
                      </ul>
                    ))}
                  </div>
                ),
              )
            : finalArray.map(
                (
                  question, // possible de creer un composant final
                ) => (
                  <div>
                    <h2>{question.questionTitle}</h2>
                    {question.responses.map((response) => (
                      <ul>
                        <li>
                          <b>
                            {response.userName} (répondu le: {response.createdAt}){' '}
                          </b>
                          : {response.response}
                        </li>
                      </ul>
                    ))}
                  </div>
                ),
              )}
        </>
      )}
    </>
  );
};

export const loaderAnswerPage = async ({ params }) => {
  return (await Meteor.callAsync('forms.getOneFromUser', params.id)) || null;
};
