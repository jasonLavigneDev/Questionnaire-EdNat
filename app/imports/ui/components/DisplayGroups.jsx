import { IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';
import DeleteIcon from '@mui/icons-material/Delete';

export const DisplayGroups = ({ userGroups }) => {
  const { currentForm, setCurrentForm } = useContext(FormContext);

  const getGroupName = (id) => {
    const index = userGroups.findIndex((group) => group._id === id);
    if (index !== -1) {
      return userGroups[index].name;
    }
    return 'N/A';
  };

  const removeGroup = (id) => {
    const { groups } = currentForm;
    setCurrentForm({ ...currentForm, groups: groups.filter((groupId) => groupId !== id) });
  };

  return (
    <div>
      {currentForm.groups.map((id) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
          <p>{getGroupName(id)}</p>
          <IconButton sx={{ color: 'salmon' }} onClick={() => removeGroup(id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
