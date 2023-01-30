import React, { useContext, useState } from 'react';

import { Paper, IconButton } from '@mui/material';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { FormContext } from '../../contexts/FormContext';
import { InputChoice } from './InputChoice';

import { CheckboxInputBuilder } from '../inputs/Checkbox/CheckboxInputBuilder';
import { SelectInputBuilder } from '../inputs/Select/SelectInputBuilder';
import { RadioInputBuilder } from '../inputs/Radio/RadioInputBuilder';
import { DateInputBuilder } from '../inputs/Date/DateInputBuilder';
import { NumberInputBuilder } from '../inputs/Number/NumberInputBuilder';
import { TextInputBuilder } from '../inputs/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from '../inputs/TextArea/TextAreaInputBuilder';

export const ListVisualizer = () => {
  const { form, setForm, activeBuilder, setActiveBuilder } = useContext(FormContext);
  const [builder, setBuilder] = useState({});
  const [yes, setYes] = useState(false);

  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos) => inputPos < form.components.length - 1;

  const generateBuilder = (component) => {
    switch (component.type) {
      case 'checkboxInput':
        return <CheckboxInputBuilder componentEdit={component} />;
      case 'selectInput':
        return <SelectInputBuilder componentEdit={component} />;
      case 'radioButtonInput':
        return <RadioInputBuilder componentEdit={component} />;
      case 'dateInput':
        return <DateInputBuilder componentEdit={component} />;
      case 'numberInput':
        return <NumberInputBuilder componentEdit={component} />;
      case 'textInput':
        return <TextInputBuilder componentEdit={component} />;
      case 'textArea':
        return <TextAreaInputBuilder componentEdit={component} />;
    }
  };

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

  console.log('builder', builder);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
          <h3>Choisissez le type de question / réponse</h3>
          {!yes ? <InputChoice /> : <div>{generateBuilder(builder)}</div>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '5vw' }}>
          <h3>Organisez vos questions</h3>
          {form.components.map((componentInput, index) => (
            <Paper sx={{ display: 'flex', width: '28vw', marginBottom: 1, border: '1px black solid' }}>
              <p style={{ paddingLeft: '0.5vw', width: '18vw' }}>{componentInput.title}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  maxHeight: '5vh',
                  marginTop: '0.70vh',
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
    </>
  );
};
