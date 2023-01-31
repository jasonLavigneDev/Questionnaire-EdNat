import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const TextInput = ({ title, answerMode, questionId }) => {
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <div>
      <InputLabel id="textInput-title">{title}</InputLabel>
      <TextField required onBlur={(e) => handleChange(e)} />
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
};
