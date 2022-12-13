import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox, InputLabel, FormGroup, FormControlLabel } from '@mui/material';

const CheckBoxInput = ({ title, choices, required = false }) => {
  // je sais pas trop quoi en faire
  // const MuiCheckboxSchema = [
  //   {
  //     name: 'checkbox',
  //     label: `${title}`,
  //     choices: choices,
  //     required: required,
  //   },
  // ];
  return (
    <div>
      <InputLabel id="checkboxInput-title">{title}</InputLabel>
      <FormGroup>
        {choices.map((choice) => (
          <FormControlLabel control={<Checkbox />} label={`${choice}`} required={required} />
        ))}
      </FormGroup>
    </div>
  );
};

export default CheckBoxInput;

CheckBoxInput.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};
