import React, { useContext, useState } from 'react';

import { Paper } from '@mui/material';

import { FormContext } from '../../contexts/FormContext';
import { InputChoice } from './InputChoice';
import { ComponentBuilder } from '../ComponentBuilder';
import ManageComponents from '../ManageComponents';

export const InputBuilder = () => {
  const { currentForm } = useContext(FormContext);
  const [componentToEdit, setComponentToEdit] = useState({});
  const [editMode, setEditMode] = useState(false);

  const class1 = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5vw',
    overflow: 'auto',
    width: '45%',
    maxHeight: '60vh',
  };

  const class2 = {
    overflow: 'auto',
    maxHeight: '60vh',
  };

  const class3 = {
    display: 'flex',
    justifyContent: 'flex-end',
    maxHeight: '5vh',
    marginTop: '0.70vh',
    margin: 'auto',
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
        <div className={class1}>
          <h3>Organisez vos questions</h3>
          <div className={class2}>
            {currentForm.components.map((currentComponent, index) => (
              <Paper sx={{ display: 'flex', width: '28vw', marginBottom: 1, border: '1px black solid' }}>
                <p style={{ paddingLeft: '0.5vw', width: '18vw' }}>{currentComponent.title}</p>
                <div className={class3}>
                  <ManageComponents
                    currentComponent={currentComponent}
                    index={index}
                    setComponentToEdit={setComponentToEdit}
                    setEditMode={setEditMode}
                  />
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
