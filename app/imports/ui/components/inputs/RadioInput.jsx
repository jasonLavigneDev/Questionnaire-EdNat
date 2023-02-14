import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, Paper } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const RadioInput = ({ title, choices, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const validateAnswer = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl onChange={(e) => validateAnswer(e)}>
        <FormLabel>{title}</FormLabel>
        <RadioGroup defaultValue={answer.answer} name="radio-buttons-group">
          {choices.map((choice) => (
            <div key={uuidv4()}>
              <FormControlLabel value={choice} control={<Radio />} label={choice} placeholder={'test'} />
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};
