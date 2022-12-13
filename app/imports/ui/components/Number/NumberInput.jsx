import React from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';

const NumberInput = ({ title }) => {
  return (
    <div>
      <InputLabel id="numberInput-title">{title}</InputLabel>
      <TextField type="number" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
    </div>
  );
};

export default NumberInput;

NumberInput.propTypes = {
  title: PropTypes.string.isRequired,
};
