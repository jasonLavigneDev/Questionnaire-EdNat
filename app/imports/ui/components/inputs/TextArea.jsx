import React from 'react';
import { FormLabel, TextField, Paper, FormControl } from '@mui/material';
import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';

export const TextArea = ({ title, questionId, answerRequired }) => {
  const dispatch = useDispatch();
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );

  const validateAnswer = (event) => {
    dispatch(addAnswers({ questionId, value: event.target.value }));
  };

  return (
    <Paper className="pad-15 wd-50">
      <FormControl required={answerRequired} className="wd-80pct">
        <FormLabel id="textAreaInput-title" error={answerRequired && !inputAnswer}>
          {title}
        </FormLabel>
        <TextField multiline defaultValue={inputAnswer?.answer ?? ''} rows={3} onChange={(e) => validateAnswer(e)} />
      </FormControl>
    </Paper>
  );
};
