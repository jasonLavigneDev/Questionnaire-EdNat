import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const SelectInput = ({ title, choices, answerMode, questionId }) => {
  const [answer, setAnswer] = useState('');
  const { addAnswers } = useContext(AnswerContext);
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="selectInput-title">{title}</InputLabel>
        <Select labelId="selectInput-title" value={title} label={title}>
          {choices.map((choice) => (
            <div key={uuidv4()}>
              <MenuItem value={choice}>{choice}</MenuItem>
            </div>
          ))}
        </Select>
      </FormControl>
      {answerMode && <button onClick={() => addAnswers(questionId, answer)}>confirmer cette reponse</button>}
    </div>
  );
};

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
};
