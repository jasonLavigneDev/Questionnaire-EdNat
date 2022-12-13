import React from 'react';
import PropTypes from 'prop-types';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectInput = ({ title, choices }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="selectInput-title">title</InputLabel>
      <Select labelId="selectInput-title" value={title} label={title}>
        {choices.map((choice) => (
          <MenuItem value={choice}>{choice}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
};
