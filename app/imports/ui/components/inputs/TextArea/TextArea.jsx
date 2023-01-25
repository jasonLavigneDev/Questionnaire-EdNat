import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';

export const TextArea = ({ title, answerMode, questionId }) => {
  const { addAnswers } = useContext(GlobalStateContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <div>
      <InputLabel id="textAreaInput-title">{title}</InputLabel>
      <TextField multiline rows={3} onBlur={(e) => handleChange(e)} />
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
};
