import React from 'react';
import { FormLabel, TextField, Paper, FormControl } from '@mui/material';
import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export const TextArea = ({ title, answerMode, questionId, answerRequired }) => {
  const dispatch = useDispatch();
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );

  const validateAnswer = (event) => {
    if (answerMode) dispatch(addAnswers({ questionId, value: event.target.value }));
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} sx={{ width: '80%' }}>
        <FormLabel id="textAreaInput-title">{title}</FormLabel>
        <TextField
          multiline
          defaultValue={inputAnswer?.answer ?? ''}
          rows={3}
          onBlur={(e) => validateAnswer(e)}
          error={answerRequired && !inputAnswer}
        />
      </FormControl>
    </Paper>
  );
};
