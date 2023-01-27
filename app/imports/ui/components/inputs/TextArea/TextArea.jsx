import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const TextArea = ({ title, answerMode, questionId, answer = {} }) => {
  const { addAnswers } = useContext(AnswerContext);

  const handleChange = (event) => {
    if (answerMode) addAnswers(questionId, event.target.value);
  };

  return (
    <div>
      <InputLabel id="textAreaInput-title">{title}</InputLabel>
      <TextField multiline defaultValue={answer.answer} rows={3} onBlur={(e) => handleChange(e)} />
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
};
