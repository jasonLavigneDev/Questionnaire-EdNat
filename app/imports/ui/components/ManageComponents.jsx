import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import { MsgError } from './system/MsgError';
import { useDispatch } from 'react-redux';
import { removeComponents } from '../redux/slices/formSlice';
import { fillQuestionObject, resetQuestionObject } from '../redux/slices/questionSlice';
import { ReorderIcon } from './ReorderIcon';

export const ManageComponent = ({ setDraggable, currentComponent }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const updateComponent = (component) => {
    dispatch(fillQuestionObject(component));
  };

  const deleteComponent = () => {
    dispatch(removeComponents({ componentId: currentComponent.id }));
    dispatch(resetQuestionObject());
  };

  const container = {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '100%',
    alignItems: 'center',
    width: '130px',
  };

  return (
    <div style={container}>
      <IconButton sx={{ color: 'Gold', marginLeft: '5px' }} onClick={() => updateComponent(currentComponent)}>
        <EditIcon />
      </IconButton>
      <IconButton sx={{ color: 'Crimson' }} onClick={deleteComponent}>
        <DeleteIcon />
      </IconButton>
      <IconButton>
        <ReorderIcon setDraggable={setDraggable} />
      </IconButton>
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
    </div>
  );
};
