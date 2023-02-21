import React from 'react';
import { FormLabel, Paper, TextField, FormControl } from '@mui/material';
import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export const TextInput = ({ title, questionId, answerRequired }) => {
  const dispatch = useDispatch();
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );

  const validateAnswer = (event) => {
    dispatch(addAnswers({ questionId, value: event.target.value }));
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} error={answerRequired && !inputAnswer} sx={{ width: '80%' }}>
        <FormLabel id="textInput-title">{title}</FormLabel>
        <TextField sx={{ width: '60%' }} defaultValue={inputAnswer?.answer ?? ''} onBlur={(e) => validateAnswer(e)} />
      </FormControl>
    </Paper>
  );
};
