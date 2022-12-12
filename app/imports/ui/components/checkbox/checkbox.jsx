import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, InputLabel, FormGroup, FormControlLabel } from '@mui/material';

const MuiCheckbox = ({ title, choices, required = false }) => {
  // je sais pas trop quoi en faire
  const MuiCheckboxSchema = [
    {
      name: 'checkbox',
      label: `${title}`,
      choices: choices,
      required: required,
    },
  ];

  // Doit retourner le schema ?
  return (
    <div>
      <InputLabel id="select-title">title</InputLabel>
      <FormGroup>
        {choices.map((choise) => (
          <FormControlLabel control={<Checkbox />} label={`${choise}`} />
        ))}
      </FormGroup>
    </div>
  );
};

export default MuiCheckbox;

MuiCheckbox.defaultProps = {
  required: false,
};

MuiCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  required: PropTypes.bool,
};

/**
 *
 *
 * {
 *  name: '',
 *  options: {
 *            label: ''
 *             required: true
 *              choices: []
 * }
 *
 * }
 */
