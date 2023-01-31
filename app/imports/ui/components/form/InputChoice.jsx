import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { FormContext } from '../../contexts/FormContext';
import { ComponentBuilder } from '../inputs/ComponentBuilder';

export const InputChoice = () => {
  const [inputType, setInputType] = useState('');
  const { form } = useContext(FormContext);

  useEffect(() => {
    setInputType('');
  }, [form.components]);

  const listOfInputBuilder = [
    {
      id: 'radioButtonInput',
      name: 'question avec choix unique de reponse parmis plusieurs propositions',
    },
    {
      id: 'selectInput',
      name: 'question avec choix unique de reponse parmis plusieurs propositions en liste déroulante ',
    },
    {
      id: 'checkboxInput',
      name: 'question avec choix multiple ou unique de réponse parmis plusieurs propositions',
    },
    {
      id: 'dateInput',
      name: 'question avec choix d une date dans un calendrier',
    },
    {
      id: 'numberInput',
      name: 'question avec choix d un nombre',
    },
    {
      id: 'textInput',
      name: 'question sans proposition de réponse (zone de texte court)',
    },
    {
      id: 'textArea',
      name: 'question sans proposition de réponse (zone de texte long)',
    },
  ];

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="selectInput-title">type de question </InputLabel>
        <Select
          labelId="selectInput-title"
          value={inputType}
          onChange={(event) => {
            setInputType(event.target.value);
          }}
        >
          {listOfInputBuilder.map((inputBuilder) => (
            <MenuItem key={inputBuilder.id} value={inputBuilder.id}>
              {inputBuilder.name}
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
