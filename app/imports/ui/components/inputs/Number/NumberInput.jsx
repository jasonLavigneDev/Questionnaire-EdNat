import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { InputLabel, TextField } from '@mui/material';
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';

export const NumberInput = ({ title, answerMode, questionId }) => {
  const { addAnswers } = useContext(GlobalStateContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <div>
      <InputLabel id="numberInput-title">{title}</InputLabel>
      <TextField
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onBlur={(e) => handleChange(e)}
      />
    </div>
  );
};

NumberInput.propTypes = {
  title: PropTypes.string.isRequired,
};
