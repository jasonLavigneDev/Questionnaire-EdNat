import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const CheckBoxInput = ({ title, choices, required = false, answerMode, questionId }) => {
  const [answers, setAnswers] = useState([]);
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    const index = answers.findIndex((o) => o.name === event.target.name);

    if (index === -1) {
      answers.push({ name: event.target.name, value: event.target.checked });
    } else {
      answers[index].value = event.target.checked;
    }
  };

  const handleBlur = () => {
    const tab = answers.filter((obj) => obj.value === true).map((obj) => obj.name);
    if (answerMode) addAnswers(questionId, tab);
  };

  const getValue = (choice) => {
    return answers[answers.findIndex((o) => o.name === choice)]?.value;
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
                  <Checkbox name={`${choice}`} checked={getValue(choice)} onChange={(event) => handleChange(event)} />
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
