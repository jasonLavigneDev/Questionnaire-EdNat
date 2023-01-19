import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { RadioInputBuilder } from '../inputs/Radio/RadioInputBuilder';
import { SelectInputBuilder } from '../inputs/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from '../inputs/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from '../inputs/Date/DateInputBuilder';
import { NumberInputBuilder } from '../inputs/Number/NumberInputBuilder';
import { TextInputBuilder } from '../inputs/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from '../inputs/TextArea/TextAreaInputBuilder';
import { FormContext } from '../../contexts/FormContext';

export const InputChoice = () => {
  const [inputType, setInputType] = useState('');
  const { form } = useContext(FormContext);

  useEffect(() => {
    setInputType('');
  }, [form.components]);

  const listOfInputBuilder = [
    {
      id: 1,
      name: 'radio',
      component: <RadioInputBuilder />,
    },
    {
      id: 2,
      name: 'select',
      component: <SelectInputBuilder />,
    },
    {
      id: 3,
      name: 'checkbox',
      component: <CheckboxInputBuilder />,
    },
    {
      id: 4,
      name: 'date',
      component: <DateInputBuilder />,
    },
    {
      id: 5,
      name: 'number',
      component: <NumberInputBuilder />,
    },
    {
      id: 6,
      name: 'text',
      component: <TextInputBuilder />,
    },
    {
      id: 7,
      name: 'textarea',
      component: <TextAreaInputBuilder />,
    },
  ];

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="selectInput-title">test selector</InputLabel>
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
