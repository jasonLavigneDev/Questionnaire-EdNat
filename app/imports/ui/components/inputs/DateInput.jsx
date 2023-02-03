import React, { useContext } from 'react';

import { InputLabel, TextField, Paper } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const DateInput = ({ title, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const validateAnswer = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <InputLabel id="dateInput-title">{title}</InputLabel>
      <TextField
        sx={{ width: '30vw' }}
        type="date"
        defaultValue={answer.answer}
        required
        onBlur={(e) => validateAnswer(e)}
      />
    </Paper>
  );
};
