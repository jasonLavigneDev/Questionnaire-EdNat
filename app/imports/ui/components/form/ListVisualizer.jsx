import React, { useContext, useState } from 'react';

import { Paper } from '@mui/material';

import { FormContext } from '../../contexts/FormContext';
import { InputChoice } from './InputChoice';
import { ComponentBuilder } from '../inputs/ComponentBuilder';
import ManageComponents from '../ManageComponents';

export const ListVisualizer = () => {
  const { currentForm } = useContext(FormContext);
  const [componentToEdit, setComponentToEdit] = useState({});
  const [editMode, setEditMode] = useState(false);

  const updateComponent = (component) => {
    setComponentToEdit(component);
    setEditMode(true);
  };

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
                  <ManageComponents currentComponent={currentComponent} index={index} editComponent={updateComponent} />
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
