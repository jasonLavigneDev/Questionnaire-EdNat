import React from 'react';
import { FormLabel, TextField, Paper, FormControl } from '@mui/material';

import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export const DateInput = ({ title, questionId, answerRequired }) => {
  const dispatch = useDispatch();
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );

  const validateAnswer = (event) => {
    dispatch(addAnswers({ questionId, value: event.target.value }));
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired}>
        <FormLabel id="dateInput-title" error={answerRequired && !inputAnswer}>
          {title}
        </FormLabel>
        <TextField
          sx={{ width: '30vw' }}
          type="date"
          defaultValue={inputAnswer?.answer ?? ''}
          required={answerRequired}
          onBlur={(e) => validateAnswer(e)}
        />
      </FormControl>
    </Paper>
  );
};
