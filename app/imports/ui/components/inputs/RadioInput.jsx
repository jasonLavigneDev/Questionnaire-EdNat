import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, Paper } from '@mui/material';
import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export const RadioInput = ({ title, choices, answerMode, questionId, answerRequired }) => {
  const dispatch = useDispatch();
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );

  const validateAnswer = (event) => {
    if (answerMode) dispatch(addAnswers({ questionId, value: event.target.value }));
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} onChange={(e) => validateAnswer(e)} error={answerRequired && !inputAnswer}>
        <FormLabel>{title}</FormLabel>
        <RadioGroup defaultValue={inputAnswer?.answer ?? ''} name="radio-buttons-group">
          {choices.map((choice) => (
            <div key={uuidv4()}>
              <FormControlLabel value={choice} control={<Radio />} label={choice} placeholder={'test'} />
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};
