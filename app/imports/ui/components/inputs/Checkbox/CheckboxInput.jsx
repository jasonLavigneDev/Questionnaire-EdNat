import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const CheckBoxInput = ({ title, choices, required = false, answerMode, questionId }) => {
  const [checked, setChecked] = useState([]);
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name, event.target.checked ]
    });
  };
  console.log(checked);

  const handleBlur = () => {
    let answer = [];
    let moncul = Object.entries(checked);
    let achier = Object.keys(checked).filter((entrie) => entrie !== false);
    console.log('moncul', moncul);
    console.log('achier', achier);
    // if (answerMode) addAnswers(questionId, answer);
  };

  return (
    <div>
      <FormControl onChange={() => handleBlur()}>
        <FormLabel>{title}</FormLabel>
        <FormGroup>
          {choices.map((choice) => (
            <div key={uuidv4()}>
              <FormControlLabel
                control={
                  <Checkbox name={`${choice}`} checked={checked[choice]} onChange={(event) => handleChange(event)} />
                }
                label={`${choice}`}
                required={required}
              />
            </div>
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

CheckBoxInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};
