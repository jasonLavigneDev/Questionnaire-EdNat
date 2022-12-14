import React from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';

export const NumberInput = ({ title }) => {
  return (
    <div>
      <InputLabel id="numberInput-title">{title}</InputLabel>
      <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
    </div>
  );
};

NumberInput.propTypes = {
  title: PropTypes.string.isRequired,
};
