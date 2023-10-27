import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Typography, Tooltip, Paper } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';

import { FormActionButton } from './FormActionButton';
import { expirationDateIsPassed } from '../utils/utils';

export const UserForm = ({ userForm, deleteForm }) => {
  console.log(userForm);
  return (
    <Paper
      key={userForm._id}
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
      }}
    >
      <div style={{ display: 'flex' }}>
        {userForm.groups.length !== 0 ? (
          <Tooltip title={i18n.__('component.userForm.form.group')}>
            <GroupsIcon />
          </Tooltip>
        ) : userForm.isPublic === false ? (
          <Tooltip title={i18n.__('component.userForm.form.private')}>
            <SecurityIcon />
          </Tooltip>
        ) : (
          <Tooltip title={i18n.__('component.userForm.form.public')}>
            <LanguageIcon />
          </Tooltip>
        )}

        {expirationDateIsPassed(userForm) ? (
          <Tooltip
            title={`${i18n.__('component.userForm.form.expired')} ${userForm.dataDeletionDate?.toLocaleDateString()}`}
          >
            <AccessTimeIcon />
          </Tooltip>
        ) : null}
        <Typography variant="body1" sx={{ marginLeft: '1vw' }}>
          {userForm.title}
        </Typography>
      </div>
      <div>
        <FormActionButton deleteForm={deleteForm} currentForm={userForm} />
      </div>
    </Paper>
  );
};
