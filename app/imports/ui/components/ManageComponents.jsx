import React, { useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addComponents, removeComponents } from '../redux/slices/formSlice';
import { fillQuestionObject, resetQuestionObject } from '../redux/slices/questionSlice';
import { MsgError } from './system/MsgError';

export default function ManageComponents({ currentComponent, index }) {
  const [errorMessage, setErrorMessage] = useState('');
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos) => inputPos < form.components.length - 1;

  const updateComponent = (component) => {
    dispatch(fillQuestionObject(component));
  };

  const swapPositionWithPreviousComponent = (inputPos) => {
    if (hasComponentBefore(inputPos)) {
      const componentsUpdated = [...form.components];
      [componentsUpdated[inputPos - 1], componentsUpdated[inputPos]] = [
        componentsUpdated[inputPos],
        componentsUpdated[inputPos - 1],
      ];
      dispatch(addComponents(componentsUpdated));
    } else {
      setErrorMessage(i18n.__('component.componentManager.errors.noQuestionBefore'));
    }
  };

  const swapPositionWithNextComponent = (inputPos) => {
    if (hasComponentAfter(inputPos)) {
      const componentsUpdated = [...form.components];
      [componentsUpdated[inputPos + 1], componentsUpdated[inputPos]] = [
        componentsUpdated[inputPos],
        componentsUpdated[inputPos + 1],
      ];
      dispatch(addComponents(componentsUpdated));
    } else {
      setErrorMessage(i18n.__('component.componentManager.errors.noQuestionAfter'));
    }
  };

  return (
    <>
      <IconButton disabled={!hasComponentBefore(index)} onClick={() => swapPositionWithPreviousComponent(index)}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton disabled={!hasComponentAfter(index)} onClick={() => swapPositionWithNextComponent(index)}>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton sx={{ color: 'Gold' }} onClick={() => updateComponent(currentComponent)}>
        <EditIcon />
      </IconButton>
      <IconButton
        sx={{ color: 'Crimson' }}
        onClick={() => {
          dispatch(removeComponents({ componentId: currentComponent.id }));
          dispatch(resetQuestionObject());
        }}
      >
        <DeleteIcon />
      </IconButton>
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
    </>
  );
}
