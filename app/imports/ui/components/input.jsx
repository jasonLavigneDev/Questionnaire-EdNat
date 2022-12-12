import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const MuiTextfield = ({ title, required = false }) => {
  // je sais pas trop quoi en faire
  const MuiInputSchema = [
    {
      title: `${title}`,
      type: 'textfield',
      required: required,
    },
  ];

  // Doit retourner le schema ?
  // peut etre le schema et le composant ?
  return (
    <div>
      <TextField id="outlined-basic" label={title} variant="outlined" />
    </div>
  );
};

export default MuiTextfield;

MuiTextfield.defaultProps = {
  required: false,
};

MuiTextfield.propTypes = {
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
