import React from 'react';
import { Typography } from '@mui/material';

import { FormActionButton } from './FormActionButton';

export const UserForm = ({ userForm, deleteForm }) => {
  return (
    <div
      key={userForm._id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ flexDirection: 'column' }}>
        <Typography variant="body1">{userForm.title}</Typography>
      </div>
      <FormActionButton deleteForm={deleteForm} currentForm={userForm} />
    </div>
  );
};
