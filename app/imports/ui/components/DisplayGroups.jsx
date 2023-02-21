import { IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { removeGroup } from '../redux/slices/formSlice';
import { getStrucGroupName } from '../../api/groups/methods';

export const DisplayGroups = ({ userGroups }) => {
  const dispatch = useDispatch();
  const formGroups = useSelector((state) => state.form.groups);

  const getGroupName = (id) => {
    const index = userGroups.findIndex((group) => group._id === id);
    if (index !== -1) {
      return getStrucGroupName(userGroups[index]);
    }
    return 'N/A';
  };

  return (
    <div>
      {formGroups.map((id) => (
        <div className="flex">
          <p>{getGroupName(id)}</p>
          <IconButton className="color-salmon" onClick={() => dispatch(removeGroup({ id }))}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
