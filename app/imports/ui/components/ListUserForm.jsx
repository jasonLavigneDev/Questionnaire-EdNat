import React from 'react';
import { Typography } from '@mui/material';

import { FormActionButton } from './FormActionButton';
import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';

export const ListUserForm = () => {
  const { allUsersForms } = useContext(FormContext);

  return (
    <>
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
