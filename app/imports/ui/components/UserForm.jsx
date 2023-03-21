import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Typography, Tooltip, Paper } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';

import { FormActionButton } from './FormActionButton';

export const UserForm = ({ userForm, deleteForm }) => {
  return (
    <Paper key={userForm._id} className="flex row wd-50pct center jc-spaceb mtb-1">
      <div className="flex pad-20">
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
        <div className="ml-1">
          <Typography variant="body1">{userForm.title}</Typography>
        </div>
      </div>
      <div>
        <FormActionButton deleteForm={deleteForm} currentForm={userForm} />
      </div>
    </Paper>
  );
};
