import React, { useContext } from 'react';

import { InputLabel, Paper, TextField } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const NumberInput = ({ title, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const validateAnswer = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <InputLabel id="numberInput-title">{title}</InputLabel>
      <TextField
        type="number"
        sx={{ width: '60%' }}
        defaultValue={answer.answer}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onBlur={(e) => validateAnswer(e)}
      />
    </Paper>
  );
};
