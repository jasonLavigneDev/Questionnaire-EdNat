import React, { useContext, useState } from 'react';

import { Paper, TextField, FormControl, FormLabel } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const NumberInput = ({ title, answerMode, questionId, answer = {}, answerRequired }) => {
  const { addAnswers } = useContext(AnswerContext);
  const [currentAnswer, setCurrentAnswer] = useState(answer.answer || '');

  const validateAnswer = (event) => {
    setCurrentAnswer(event.target.value);
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl required={answerRequired} sx={{ width: '80%' }}>
        <FormLabel id="numberInput-title">{title}</FormLabel>
        <TextField
          type="number"
          defaultValue={answer.answer}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onBlur={(e) => validateAnswer(e)}
          error={answerRequired && !!!currentAnswer}
        />
      </FormControl>
    </Paper>
  );
};
