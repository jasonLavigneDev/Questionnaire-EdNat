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
  const { form, setForm, activeBuilder, setActiveBuilder } = useContext(FormContext);
  const [builder, setBuilder] = useState({});
  const [yes, setYes] = useState(false);

  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos) => inputPos < form.components.length - 1;

  const swapPositionWithPreviousComponent = (inputPos) => {
    if (hasComponentBefore(inputPos)) {
      const newObj = [...form.components];
      [newObj[inputPos - 1], newObj[inputPos]] = [newObj[inputPos], newObj[inputPos - 1]];
      setForm({ ...form, components: newObj });
    } else {
      console.log("Il n'y a pas de question avant celle ci, impossible de swap");
    }
  };

  const swapPositionWithNextComponent = (inputPos) => {
    if (hasComponentAfter(inputPos)) {
      const newObj = [...form.components];
      [newObj[inputPos + 1], newObj[inputPos]] = [newObj[inputPos], newObj[inputPos + 1]];
      setForm({ ...form, components: newObj });
    } else {
      console.log("Il n'y a pas de question apres celle ci, impossible de swap");
    }
  };

  const editComponent = (component) => {
    setBuilder(component);
    setYes(!yes);
  };

  const removeComponentToForm = (componentId) => {
    const newObj = form.components.filter((componentInput) => componentInput.id != componentId);
    setForm({ ...form, components: newObj });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
          <h3>Choisissez le type de question / réponse</h3>
          {!yes ? <InputChoice /> : <ComponentBuilder type={builder.type} componentEdit={builder} />}
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
            {form.components.map((componentInput, index) => (
              <Paper sx={{ display: 'flex', width: '28vw', marginBottom: 1, border: '1px black solid' }}>
                <p style={{ paddingLeft: '0.5vw', width: '18vw' }}>{componentInput.title}</p>
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
                  <IconButton sx={{ color: 'salmon' }} onClick={() => editComponent(componentInput)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'salmon' }} onClick={() => removeComponentToForm(componentInput.id)}>
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
