import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField, Paper } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const NumberInput = ({ title, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <InputLabel id="numberInput-title">{title}</InputLabel>
      <TextField
        type="number"
        sx={{ width: '60%' }}
        defaultValue={answer.answer}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onBlur={(e) => handleChange(e)}
      />
    </Paper>
  );
};

NumberInput.propTypes = {
  title: PropTypes.string.isRequired,
};
