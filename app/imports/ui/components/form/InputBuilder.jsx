import React, { useContext, useState } from 'react';

import { Paper, Tooltip } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

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
    alignItems: 'center',
    height: '5vh',
    marginTop: '1vh',
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
                <div
                  style={{ display: 'flex', paddingLeft: '0.5vw', width: '18vw', alignItems: 'center', height: '5vh' }}
                >
                  {currentComponent.title}
                  <div>
                    {currentComponent.answerRequired && (
                      <Tooltip title="la question est required">
                        <PriorityHighIcon />
                      </Tooltip>
                    )}
                  </div>
                </div>
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
