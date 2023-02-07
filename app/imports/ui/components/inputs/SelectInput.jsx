import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const SelectInput = ({ title, choices, answerMode, questionId, answer = {} }) => {
  const [currentAnswer, setCurrentAnswer] = useState(answer.answer || '');
  const { addAnswers } = useContext(AnswerContext);

  const validateAnswer = (event) => {
    setCurrentAnswer(event.target.value);
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl sx={{ width: '30vw' }}>
        <InputLabel id="selectInput-title">{title}</InputLabel>
        <Select labelId="selectInput-title" label={title} value={currentAnswer} onChange={validateAnswer}>
          {choices.map((choice) => (
            <MenuItem key={uuidv4()} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};