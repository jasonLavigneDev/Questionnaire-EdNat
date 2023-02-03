import React, { useContext, useState } from 'react';

import { Paper, IconButton } from '@mui/material';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../contexts/FormContext';
import { InputChoice } from './InputChoice';
import { ComponentBuilder } from '../inputs/ComponentBuilder';

export const ListVisualizer = () => {
  const { currentForm, setCurrentForm } = useContext(FormContext);
  const [componentToEdit, setComponentToEdit] = useState({});
  const [editMode, setEditMode] = useState(false);

  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos) => inputPos < currentForm.components.length - 1;

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

  const updateComponent = (component) => {
    setComponentToEdit(component);
    setEditMode(true);
  };

  const removeComponent = (componentId) => {
    const componentsUpdated = currentForm.components.filter((componentInput) => componentInput.id != componentId);
    setCurrentForm({ ...currentForm, components: componentsUpdated });
  };

  console.log('editMode dans list', editMode);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
          <h3>Choisissez le type de question / réponse</h3>
          {editMode ? (
            <ComponentBuilder type={componentToEdit.type} componentToEdit={componentToEdit} setEditMode={setEditMode} />
          ) : (
            <InputChoice />
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '5vw',
            overflow: 'auto',
            width: '45%',
            maxHeight: '60vh',
          }}
        >
          <h3>Organisez vos questions</h3>
          <div
            style={{
              overflow: 'auto',
              maxHeight: '60vh',
            }}
          >
            {currentForm.components.map((currentComponent, index) => (
              <Paper sx={{ display: 'flex', width: '28vw', marginBottom: 1, border: '1px black solid' }}>
                <p style={{ paddingLeft: '0.5vw', width: '18vw' }}>{currentComponent.title}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    maxHeight: '5vh',
                    marginTop: '0.70vh',
                    margin: 'auto',
                  }}
                >
                  <IconButton onClick={() => swapPositionWithPreviousComponent(index)}>
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton onClick={() => swapPositionWithNextComponent(index)}>
                    <ArrowDownwardIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'salmon' }} onClick={() => updateComponent(currentComponent)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'salmon' }} onClick={() => removeComponent(currentComponent.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
