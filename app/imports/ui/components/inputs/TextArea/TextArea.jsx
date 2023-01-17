import React from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';

export const TextArea = ({ title, answerMode }) => {
  return (
    <div>
      <InputLabel id="textAreaInput-title">{title}</InputLabel>
      <TextField multiline rows={3} />
      {/** for response */}
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
};
