import React, { useContext, useState } from 'react';

import { FormLabel, Paper, TextField, FormControl } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const TextInput = ({ title, answerMode, questionId, answer = {}, answerRequired }) => {
  const { addAnswers } = useContext(AnswerContext);
  const [currentAnswer, setCurrentAnswer] = useState(answer.answer || '');

  const handleChange = (event) => {
    setCurrentAnswer(event.target.value);
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} error={answerRequired && !!!currentAnswer} sx={{ width: '80%' }}>
        <FormLabel id="textInput-title">{title}</FormLabel>
        <TextField sx={{ width: '60%' }} defaultValue={answer.answer} onBlur={(e) => handleChange(e)} />
      </FormControl>
    </Paper>
  );
};
