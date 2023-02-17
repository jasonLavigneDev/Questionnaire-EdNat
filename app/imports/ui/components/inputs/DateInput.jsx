import React, { useContext, useState } from 'react';

import { FormLabel, TextField, Paper, FormControl } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const DateInput = ({ title, answerMode, questionId, answer = {}, answerRequired }) => {
  const { addAnswers } = useContext(AnswerContext);
  const [currentAnswer, setCurrentAnswer] = useState(answer.answer || '');

  const validateAnswer = (event) => {
    setCurrentAnswer(event.target.value);
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired}>
        <FormLabel id="dateInput-title">{title}</FormLabel>
        <TextField
          sx={{ width: '30vw' }}
          type="date"
          defaultValue={answer.answer}
          required={answerRequired}
          onBlur={(e) => validateAnswer(e)}
          error={answerRequired && !currentAnswer}
        />
      </FormControl>
    </Paper>
  );
};
