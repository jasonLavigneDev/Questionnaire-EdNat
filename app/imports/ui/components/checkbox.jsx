import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const MuiCheckbox = ({ title, choises, required = false }) => {
  // je sais pas trop quoi en faire
  const MuiCheckboxSchema = [
    {
      name: 'checkbox',
      label: `${title}`,
      choises: choises,
      required: required,
    },
  ];

  // Doit retourner le schema ?
  return (
    <div>
      <FormGroup>
        {choises.map((choise) => (
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
  choises: PropTypes.arrayOf(PropTypes.string).isRequired,
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
 *              choises: []
 * }
 *
 * }
 */
