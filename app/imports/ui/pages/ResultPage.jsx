import { Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import React from 'react';
import i18n from 'meteor/universe:i18n';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';

import AnswerListDisplay from '../components/AnswerListDisplay';
import GenerateChart from '../components/GenerateChart';
import { hasNotAnswers } from '../utils/utils';

export const ResultPage = () => {
  const formFromBDD = useLoaderData();
  const finalArray = [];
  const statArray = [];
  const [statMode, setStatMode] = useState(false);

  const navigate = useNavigate();

  const IsValidComponentToAnalyze = (type) => {
    return type != 'sectionStart' && type != 'sectionEnd' && type != 'separator';
  };

  formFromBDD.components.forEach((component) => {
    if (IsValidComponentToAnalyze(component.type)) {
      finalArray.push({
        questionTitle: component.title,
        questionId: component.id,
        questionType: component.type,
        responses: [],
      });
    }
  });

  formFromBDD.formAnswers?.forEach((userAnswer, index) => {
    finalArray.map((questionObj) => {
      const questionId = questionObj.questionId;
      let response = userAnswer.answers
        .filter((answer) => answer.questionId === questionId)
        .map((answer) => answer.answer);

      questionObj.responses.push({
        response: response[0],
        index: index,
        createdAt: userAnswer.createdAt.toLocaleDateString(),
      });
    });
  });

  const CanHaveStat = (type) => {
    if (type !== 'textInput' && type !== 'textArea') return true;
    return false;
  };

  finalArray.map((question) => {
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
  });

  console.log(finalArray);

  const deleteAllAnswers = async () => {
    formFromBDD.formAnswers = [];
    await Meteor.callAsync('forms.clearAnswers', formFromBDD._id);
    navigate('/');
  };

  const hasNotAnswers = () => {
    if (!formFromBDD.formAnswers || formFromBDD.formAnswers.length === 0) return true;
    return false;
  };

  return (
    <>
      {hasNotAnswers(formFromBDD) ? (
        <>
          <p>{i18n.__('page.resultPage.noAnswers')}</p>
          <Button variant="contained" onClick={() => navigate('/')}>
            {i18n.__('page.resultPage.goBack')}
          </Button>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ display: 'flex', flex: 3 }}>{formFromBDD.title}</h1>
            <div style={{ justifyContent: 'flex-end' }}>
              <ToggleButtonGroup value={statMode} exclusive>
                <ToggleButton value={false} onClick={() => setStatMode(!statMode)}>
                  <ListAltIcon />
                </ToggleButton>
                <ToggleButton value={true} onClick={() => setStatMode(!statMode)}>
                  <BarChartIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => navigate('/')}>
              {i18n.__('page.resultPage.goBack')}
            </Button>
          </div>
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
