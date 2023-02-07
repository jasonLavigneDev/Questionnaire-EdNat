import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const CheckBoxInput = ({ title, choices, required = false, answerMode, questionId, answer = {} }) => {
  const [answers, setAnswers] = useState([]);

  const { addAnswers } = useContext(AnswerContext);

  const getIndex = (obj) => {
    return answers.findIndex((answer) => answer.name === obj);
  };

  const addCheckedAnswers = (event) => {
    // const index = answers.findIndex((answer) => answer.name === event.target.name);
    const index = getIndex(event.target.value);

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
    // return answers[answers.findIndex((o) => o.name === choice)]?.value;
    return answers[index]?.value;
  };

  useEffect(() => {
    if (answer.answer) {
      answer.answer.map((resp) => {
        setAnswers([...answers, { name: resp, value: true }]);
      });
    }
  }, []);

  return (
    <div>
      <FormControl onChange={() => validateAnswer()}>
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
                required={required}
              />
            </div>
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};
