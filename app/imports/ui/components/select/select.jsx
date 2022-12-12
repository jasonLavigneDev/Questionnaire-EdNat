import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const MuiSelect = ({ title, choices }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-title">title</InputLabel>
      <Select labelId="select-title" value={title} label={title}>
        {choices.map((choice) => (
          <MenuItem value={choice}>{choice}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MuiSelect;

MuiSelect.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
};
