import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import PropTypes from 'prop-types';

export const MsgError = ({ message, setMessage }) => {
  const [open, setOpen] = useState(true);

  if (message.length === 0) {
    setOpen(false);
  }
  return (
    <Snackbar
      autoHideDuration={4000}
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={() => {
        setOpen(false);
        setMessage('');
      }}
    >
      <Alert severity="error">{message}</Alert>
    </Snackbar>
  );
};

MsgError.PropTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};
