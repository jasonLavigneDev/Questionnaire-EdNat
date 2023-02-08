import React from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';

export default function ManageComponents({ currentComponent, index }) {
  const { currentForm } = useContext(FormContext);

  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos) => inputPos < currentForm.components.length - 1;

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
      console.log("Il n'y a pas de question avant celle ci, impossible de swap");
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
      console.log("Il n'y a pas de question apres celle ci, impossible de swap");
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
      <IconButton sx={{ color: 'Gold' }} onClick={() => editComponent(currentComponent)}>
        <EditIcon />
      </IconButton>
      <IconButton sx={{ color: 'Crimson' }} onClick={() => removeComponentToForm(currentComponent.id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
}
