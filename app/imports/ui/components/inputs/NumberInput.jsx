import React from 'react';
import { Paper, TextField, FormControl, FormLabel } from '@mui/material';
import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export const NumberInput = ({ title, questionId, answerRequired }) => {
  const dispatch = useDispatch();
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );

  const validateAnswer = (event) => {
    dispatch(addAnswers({ questionId, value: event.target.value }));
  };

  return (
    <Paper className="pad-2 wd-50">
      <FormControl required={answerRequired} className="wd-80pct">
        <FormLabel id="numberInput-title" error={answerRequired && !inputAnswer}>
          {title}
        </FormLabel>
        <TextField
          type="number"
          defaultValue={Number(inputAnswer?.answer) || 0}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={(e) => validateAnswer(e)}
        />
      </FormControl>
    </Paper>
  );
};
