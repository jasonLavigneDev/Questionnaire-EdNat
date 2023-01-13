import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

export const SubmitButton = ({ handleClick }) => {
  return (
    <div style={{ border: '1px solid black', borderRadius: '10px' }}>
      <IconButton sx={{ width: '100%' }} onClick={() => handleClick()}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

SubmitButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
