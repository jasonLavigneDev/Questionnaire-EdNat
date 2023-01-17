import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const RadioInput = ({ title, choices, answerMode, questionId }) => {
  const [answer, setAnswer] = useState('');
  const { addAnswers } = useContext(AnswerContext);

  return (
    <div>
      <FormControl>
        <FormLabel>{title}</FormLabel>
        <RadioGroup defaultValue="female" name="radio-buttons-group">
          {choices.map((choice) => (
            <div key={uuidv4()}>
              <FormControlLabel value={choice} control={<Radio />} label={choice} />
            </div>
          ))}
        </RadioGroup>
      </FormControl>
      {answerMode && <button onClick={() => addAnswers(questionId, answer)}>confirmer cette reponse</button>}
    </div>
  );
};
