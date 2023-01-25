import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';

export const DateInput = ({ title, answerMode, questionId }) => {
  const { addAnswers } = useContext(GlobalStateContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <div>
      <InputLabel id="dateInput-title">{title}</InputLabel>
      <TextField type="date" required onBlur={(e) => handleChange(e)} />
    </div>
  );
};

DateInput.propTypes = {
  title: PropTypes.string.isRequired,
};
