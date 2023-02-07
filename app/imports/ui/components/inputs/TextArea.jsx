import React, { useContext } from 'react';

import { InputLabel, TextField, Paper } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const TextArea = ({ title, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const validateAnswer = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <InputLabel id="textAreaInput-title">{title}</InputLabel>
      <TextField
        sx={{ width: '60%' }}
        multiline
        defaultValue={answer.answer}
        rows={3}
        onBlur={(e) => validateAnswer(e)}
      />
    </Paper>
  );
};