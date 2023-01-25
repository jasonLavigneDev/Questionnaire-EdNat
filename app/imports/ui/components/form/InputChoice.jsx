import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { RadioInputBuilder } from '../inputs/Radio/RadioInputBuilder';
import { SelectInputBuilder } from '../inputs/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from '../inputs/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from '../inputs/Date/DateInputBuilder';
import { NumberInputBuilder } from '../inputs/Number/NumberInputBuilder';
import { TextInputBuilder } from '../inputs/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from '../inputs/TextArea/TextAreaInputBuilder';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';

export const InputChoice = () => {
  const [inputType, setInputType] = useState('');
  const { form } = useContext(GlobalStateContext);

  const listOfInputBuilder = [
    {
      id: 1,
      name: 'question avec choix unique de reponse parmis plusieurs propositions',
      component: <RadioInputBuilder />,
    },
    {
      id: 2,
      name: 'question avec choix unique de reponse parmis plusieurs propositions en liste déroulante ',
      component: <SelectInputBuilder />,
    },
    {
      id: 3,
      name: 'question avec choix multiple ou unique de réponse parmis plusieurs propositions',
      component: <CheckboxInputBuilder />,
    },
    {
      id: 4,
      name: 'question avec choix d une date dans un calendrier',
      component: <DateInputBuilder />,
    },
    {
      id: 5,
      name: 'question avec choix d un nombre',
      component: <NumberInputBuilder />,
    },
    {
      id: 6,
      name: 'question sans proposition de réponse (zone de texte court)',
      component: <TextInputBuilder />,
    },
    {
      id: 7,
      name: 'question sans proposition de réponse (zone de texte long)',
      component: <TextAreaInputBuilder />,
    },
  ];

  useEffect(() => {
    setInputType('');
  }, [form.components]);

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
            <MenuItem key={inputBuilder.id} value={inputBuilder.name}>
              {inputBuilder.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {inputType !== '' && (
        <>
          <br />
          <br />
          <div>{listOfInputBuilder.find((input) => input.name === inputType).component}</div>
        </>
      )}
    </div>
  );
};
