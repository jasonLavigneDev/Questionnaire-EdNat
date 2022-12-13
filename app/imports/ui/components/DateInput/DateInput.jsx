import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel, TextField } from '@mui/material';

export const DateInput = ({ title }) => {
  return (
    <div>
      <InputLabel id="dateInput-title">{title}</InputLabel>
      <TextField type="date" required />
      {/** for response */}
    </div>
  );
};

DateInput.propTypes = {
  title: PropTypes.string.isRequired,
};
