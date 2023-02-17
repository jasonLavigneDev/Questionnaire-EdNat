import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Paper } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const CheckBoxInput = ({ title, choices, answerMode, questionId, answer = {}, answerRequired }) => {
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState(answer.answer || '');

  const { addAnswers } = useContext(AnswerContext);

  const getIndex = (obj) => {
    return answers.findIndex((answer) => answer.name === obj);
  };

  const addCheckedAnswers = (event) => {
    setCurrentAnswer(event.target.value);
    const index = getIndex(event.target.name);

    if (index === -1) {
      answers.push({ name: event.target.name, value: event.target.checked });
    } else {
      answers[index].value = event.target.checked;
    }
  };

  const validateAnswer = () => {
    const tab = answers.filter((obj) => obj.value === true).map((obj) => obj.name);
    if (answerMode) addAnswers(questionId, tab);
  };

  const getValue = (choice) => {
    const index = getIndex(choice);
    if (index === -1) return false;
    return answers[index]?.value;
  };

  useEffect(() => {
    if (answer.answer) {
      const answersCopy = [...answers];
      answer.answer.map((resp) => {
        answersCopy.push({ name: resp, value: true });
      });
      setAnswers(answersCopy);
    }
  }, []);

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} error={answerRequired && !currentAnswer} onChange={() => validateAnswer()}>
        <FormLabel>{title}</FormLabel>
        <FormGroup>
          {choices.map((choice) => (
            <div key={uuidv4()}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={`${choice}`}
                    checked={getValue(choice)}
                    onChange={(event) => addCheckedAnswers(event)}
                  />
                }
                label={`${choice}`}
              />
            </div>
          ))}
        </FormGroup>
      </FormControl>
    </Paper>
  );
};
