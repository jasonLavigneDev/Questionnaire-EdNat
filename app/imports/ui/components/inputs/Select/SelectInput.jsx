import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const SelectInput = ({ title, choices, answerMode, questionId, answer = {} }) => {
  const [currentAnswer, setCurrentAnswer] = useState(answer.answer || '');
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    setCurrentAnswer(event.target.value);
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <FormControl sx={{ width: '30vw' }}>
        <InputLabel id="selectInput-title">{title}</InputLabel>
        <Select labelId="selectInput-title" label={title} value={currentAnswer} onChange={handleChange}>
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

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
};
