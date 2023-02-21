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
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} sx={{ width: '80%' }}>
        <FormLabel id="numberInput-title">{title}</FormLabel>
        <TextField
          type="number"
          defaultValue={Number(inputAnswer?.answer)}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={(e) => validateAnswer(e)}
          error={answerRequired && !inputAnswer}
        />
      </FormControl>
    </Paper>
  );
};
