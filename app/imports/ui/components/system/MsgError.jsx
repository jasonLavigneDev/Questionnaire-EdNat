import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const MsgError = ({ message, setMessage }) => {
  const [open, setOpen] = useState(true);

  if (!message.length) setOpen(false);

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
