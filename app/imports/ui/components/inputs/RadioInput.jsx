import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio, Paper } from '@mui/material';
import { AnswerContext } from '../../contexts/AnswerContext';

export const RadioInput = ({ title, choices, answerMode, questionId, answer = {}, answerRequired }) => {
  const { addAnswers } = useContext(AnswerContext);
  const [currentAnswer, setCurrentAnswer] = useState(answer.answer || '');

  const validateAnswer = (event) => {
    setCurrentAnswer(event.target.value);
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl
        required={answerRequired}
        onChange={(e) => validateAnswer(e)}
        error={answerRequired && !!!currentAnswer}
      >
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
