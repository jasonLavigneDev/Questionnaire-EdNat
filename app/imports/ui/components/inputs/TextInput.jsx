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
    <Paper className="wd-50 pad-15">
      <FormControl required={answerRequired} error={answerRequired && !inputAnswer} className="wd-80pct">
        <FormLabel id="textInput-title">{title}</FormLabel>
        <TextField className="wd-60pct" defaultValue={inputAnswer?.answer ?? ''} onChange={(e) => validateAnswer(e)} />
      </FormControl>
    </Paper>
  );
};
