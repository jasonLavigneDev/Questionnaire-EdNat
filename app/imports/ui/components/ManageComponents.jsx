import React from 'react';
import { i18n } from 'meteor/universe:i18n';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';
import { MsgError } from './system/MsgError';

export default function ManageComponents({ currentComponent, index, setComponentToEdit, setEditMode }) {
  const { currentForm, setCurrentForm } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState('');

  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos) => inputPos < currentForm.components.length - 1;

  const updateComponent = (component) => {
    setComponentToEdit(component);
    setEditMode(true);
  };
  const removeComponentToForm = (componentId) => {
    const componentsUpdated = currentForm.components.filter((currentComponent) => currentComponent.id != componentId);
    setCurrentForm({ ...currentForm, components: componentsUpdated });
  };

  const swapPositionWithPreviousComponent = (inputPos) => {
    if (hasComponentBefore(inputPos)) {
      const componentsUpdated = [...currentForm.components];
      [componentsUpdated[inputPos - 1], componentsUpdated[inputPos]] = [
        componentsUpdated[inputPos],
        componentsUpdated[inputPos - 1],
      ];
      setCurrentForm({ ...currentForm, components: componentsUpdated });
    } else {
      setErrorMessage(i18n.__('component.componentManager.errors.noQuestionBefore'));
    }
  };

  const swapPositionWithNextComponent = (inputPos) => {
    if (hasComponentAfter(inputPos)) {
      const componentsUpdated = [...currentForm.components];
      [componentsUpdated[inputPos + 1], componentsUpdated[inputPos]] = [
        componentsUpdated[inputPos],
        componentsUpdated[inputPos + 1],
      ];
      setCurrentForm({ ...currentForm, components: componentsUpdated });
    } else {
      setErrorMessage(i18n.__('component.componentManager.errors.noQuestionAfter'));
    }
  };

  return (
    <>
      <IconButton onClick={() => swapPositionWithPreviousComponent(index)}>
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton onClick={() => swapPositionWithNextComponent(index)}>
        <ArrowDownwardIcon />
      </IconButton>
      <IconButton sx={{ color: 'Gold' }} onClick={() => updateComponent(currentComponent)}>
        <EditIcon />
      </IconButton>
      <IconButton sx={{ color: 'Crimson' }} onClick={() => removeComponentToForm(currentComponent.id)}>
        <DeleteIcon />
      </IconButton>
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
    </>
  );
}
