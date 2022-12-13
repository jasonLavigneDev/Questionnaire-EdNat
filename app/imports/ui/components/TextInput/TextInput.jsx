import React from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';

export const TextInput = ({ title }) => {
  return (
    <div>
      <InputLabel id="textInput-title">{title}</InputLabel>
      <TextField required />
      {/** for response */}
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
};
