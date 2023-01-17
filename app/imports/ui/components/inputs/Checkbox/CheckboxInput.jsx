import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Checkbox, InputLabel, FormGroup, FormControlLabel } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const CheckBoxInput = ({ title, choices, required = false, answerMode, questionId }) => {
  const [answer, setAnswer] = useState('');
  const { addAnswers } = useContext(AnswerContext);

  return (
    <div>
      <InputLabel id="checkboxInput-title">{title}</InputLabel>
      <FormGroup>
        {choices.map((choice) => (
          <div key={uuidv4()}>
            <FormControlLabel control={<Checkbox />} label={`${choice}`} required={required} />
          </div>
        ))}
      </FormGroup>
      {answerMode && <button onClick={() => addAnswers(questionId, answer)}>confirmer cette reponse</button>}
    </div>
  );
};

CheckBoxInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};
