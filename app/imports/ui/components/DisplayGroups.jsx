import { IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeGroup } from '../redux/slices/formSlice';

export const DisplayGroups = ({ userGroups }) => {
  const dispatch = useDispatch();
  const formGroups = useSelector((state) => state.form.groups);

  const getGroupName = (id) => {
    const index = userGroups.findIndex((group) => group._id === id);
    if (index !== -1) {
      return userGroups[index].name;
    }
    return 'N/A';
  };

  return (
    <div>
      {formGroups.map((id) => (
        <div style={{ display: 'flex' }}>
          <p>{getGroupName(id)}</p>
          <IconButton sx={{ color: 'salmon' }} onClick={() => dispatch(removeGroup({ id }))}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
