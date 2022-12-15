import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const SelectInput = ({ title, choices }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="selectInput-title">{title}</InputLabel>
      <Select labelId="selectInput-title" value={title} label={title}>
        {choices.map((choice) => (
          <div key={uuidv4()}>
            <MenuItem value={choice}>{choice}</MenuItem>
          </div>
        ))}
      </Select>
    </FormControl>
  );
};

SelectInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
};
