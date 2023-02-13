import React, { useContext } from 'react';

import { InputLabel, Paper, TextField } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const TextInput = ({ title, answerMode, questionId, answer = {}, answerRequired }) => {
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <InputLabel id="textInput-title">{title}</InputLabel>
      <TextField
        sx={{ width: '60%' }}
        required={answerRequired}
        defaultValue={answer.answer}
        onBlur={(e) => handleChange(e)}
      />
    </Paper>
  );
};
