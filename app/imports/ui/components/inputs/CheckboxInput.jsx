import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Paper } from '@mui/material';
import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export const CheckBoxInput = ({ title, choices, questionId, answerRequired }) => {
  const [answers, setAnswers] = useState([]);
  const dispatch = useDispatch();
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );

  const getIndex = (obj) => {
    return answers.findIndex((answer) => answer.name === obj);
  };

  const addCheckedAnswers = (event) => {
    const index = getIndex(event.target.value);

    if (index === -1) {
      answers.push({ name: event.target.name, value: event.target.checked });
    } else {
      answers[index].value = event.target.checked;
    }
  };

  const validateAnswer = () => {
    const tab = answers.filter((obj) => obj.value === true).map((obj) => obj.name);
    dispatch(addAnswers({ questionId, value: tab }));
  };

  const getValue = (choice) => {
    const index = getIndex(choice);
    return answers[index]?.value;
  };

  useEffect(() => {
    if (inputAnswer) {
      const answersCopy = [...answers];

      inputAnswer.answer.map((resp) => {
        answersCopy.push({ name: resp, value: true });
      });
      setAnswers(answersCopy);
    }
  }, []);

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} error={answerRequired && !inputAnswer} onChange={() => validateAnswer()}>
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
