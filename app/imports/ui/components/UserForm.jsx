import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';

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
        {userForm.groups.length !== 0 ? (
          <Tooltip title="formulaire de groupe">
            <GroupsIcon />
          </Tooltip>
        ) : (
          userForm.isPublic === false && (
            <Tooltip title="formulaire privé">
              <SecurityIcon />
            </Tooltip>
          )
        )}
        <Typography variant="body1" sx={{ marginLeft: userForm.isPublic ? '2.5vw' : '1vw' }}>
          {userForm.title}
        </Typography>
      </div>
      <div>
        <FormActionButton deleteForm={deleteForm} currentForm={userForm} />
      </div>
    </div>
  );
};
