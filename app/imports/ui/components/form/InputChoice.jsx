import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Select, InputLabel, MenuItem, OutlinedInput, Divider } from '@mui/material';
import { FormContext } from '../../contexts/FormContext';
import { ComponentBuilder } from '../inputs/ComponentBuilder';
import { LIST_OF_INPUT_BUILDER } from '../listOfInputBuilder';

export const InputChoice = () => {
  const [inputType, setInputType] = useState('');
  const { currentForm } = useContext(FormContext);

  useEffect(() => {
    setInputType('');
  }, [currentForm.components]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="selectInput-title">Type de question</InputLabel>
        <Select
          labelId="selectInput-title"
          value={inputType}
          input={<OutlinedInput label="Type de question" />}
          onChange={(event) => {
            setInputType(event.target.value);
          }}
        >
          {LIST_OF_INPUT_BUILDER.map((inputBuilder) => (
            <MenuItem key={inputBuilder.id} value={inputBuilder.id}>
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                {inputBuilder.icon}
                <Divider orientation="vertical" flexItem sx={{ margin: '0 1vw' }} />
                {inputBuilder.name}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {inputType !== '' && (
        <>
          <br />
          <div>
            <ComponentBuilder type={inputType} />
          </div>
        </>
      )}
    </div>
  );
};
