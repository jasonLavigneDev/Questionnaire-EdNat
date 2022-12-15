import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Checkbox, InputLabel, FormGroup, FormControlLabel } from '@mui/material';

export const CheckBoxInput = ({ title, choices, required = false }) => {
  return (
    <div>
      <InputLabel id="checkboxInput-title">{title}</InputLabel>
      <FormGroup>
        {choices.map((choice) => (
          <div key={uuidv4()}>
            <FormControlLabel control={<Checkbox />} label={`${choice}`} required={required} />
          </div>
        ))}
      </FormGroup>
    </div>
  );
};

CheckBoxInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};
