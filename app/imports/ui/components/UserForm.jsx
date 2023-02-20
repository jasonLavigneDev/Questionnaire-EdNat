import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
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
        ) : userForm.isPublic === false ? (
          <Tooltip title="formulaire privé">
            <SecurityIcon />
          </Tooltip>
        ) : (
          <Tooltip title="formulaire publique">
            <LanguageIcon />
          </Tooltip>
        )}
        <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
          {userForm.title}
        </Typography>
      </div>
      <div>
        <FormActionButton deleteForm={deleteForm} currentForm={userForm} />
      </div>
    </div>
  );
};
