import { Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import AnswerListDisplay from '../components/AnswerListDisplay';
import GenerateChart from '../components/GenerateChart';

export const ResultPage = () => {
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

      questionObj.responses.push({
        response: response[0],
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
        const index = stat.findIndex((res) => response.response === res.answer);
        if (index !== -1) {
          stat[index].count++;
        } else {
          stat.push({ answer: response.response, count: 1 });
        }
      });

      let choices = [];
      if (question.questionType === 'checkboxInput') {
        choices = formFromBDD.components.filter((component) => component.id === question.questionId)[0].choices;
      }

      statArray.push({
        questionTitle: question.questionTitle,
        questionId: question.questionId,
        questionType: question.questionType,
        stat: stat,
        questionChoices: choices,
      });
    }
  });
  const hasNotAnswers = () => {
    if (!formFromBDD.formAnswers || formFromBDD.formAnswers.length === 0) return true;
    return false;
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
          {statMode ? <GenerateChart statArray={statArray} /> : <AnswerListDisplay finalArray={finalArray} />}
        </>
      )}
    </>
  );
};

export const loaderAnswerPage = async ({ params }) => {
  const userForm = await Meteor.callAsync('forms.getOneFromUser', params.id);
  return userForm || null;
};
