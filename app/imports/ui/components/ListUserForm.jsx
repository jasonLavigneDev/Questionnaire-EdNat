import React from 'react';
import { Typography } from '@mui/material';

import { FormActionButton } from './FormActionButton';

export const ListUserForm = ({ allUsersForms }) => {
  if (allUsersForms.length <= 0) return <p>Vous n'avez pas encore de questionnaires</p>;
  return (
    <>
      <h2>Liste de vos questionnaires</h2>
      {allUsersForms.map((userForm) => (
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
          <FormActionButton currentForm={userForm} />
        </div>
      ))}
    </>
  );
};
