import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

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
      <div style={{ display: 'flex' }}>
        {userForm.isPublic === false && (
          <Tooltip title="formulaire privé">
            <VisibilityOffOutlinedIcon />
          </Tooltip>
        )}
        <Typography variant="body1" sx={{ marginLeft: userForm.isPublic ? '2.25vw' : '1vw' }}>
          {userForm.title}
        </Typography>
      </div>
      <div>
        <FormActionButton deleteForm={deleteForm} currentForm={userForm} />
      </div>
    </div>
  );
};
