import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField, Paper } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const DateInput = ({ title, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <Paper sx={{ padding: '2vh 2vw', width: '50vw' }}>
      <InputLabel id="dateInput-title">{title}</InputLabel>
      <TextField
        sx={{ width: '30vw' }}
        type="date"
        defaultValue={answer.answer}
        required
        onBlur={(e) => handleChange(e)}
      />
    </Paper>
  );
};

DateInput.propTypes = {
  title: PropTypes.string.isRequired,
};
