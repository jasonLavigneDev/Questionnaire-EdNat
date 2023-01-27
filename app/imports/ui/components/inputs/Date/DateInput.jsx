import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const DateInput = ({ title, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <div>
      <InputLabel id="dateInput-title">{title}</InputLabel>
      <TextField type="date" defaultValue={answer.answer} required onBlur={(e) => handleChange(e)} />
    </div>
  );
};

DateInput.propTypes = {
  title: PropTypes.string.isRequired,
};
