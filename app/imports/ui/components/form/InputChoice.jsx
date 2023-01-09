import React, { useState, useEffect } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';

import { RadioInputBuilder } from '../inputs/Radio/RadioInputBuilder';
import { SelectInputBuilder } from '../inputs/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from '../inputs/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from '../inputs/Date/DateInputBuilder';
import { NumberInputBuilder } from '../inputs/Number/NumberInputBuilder';
import { TextInputBuilder } from '../inputs/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from '../inputs/TextArea/TextAreaInputBuilder';

export default function InputChoice({ list, setList }) {
  const [component, setComponent] = useState('');

  const handleChange = (event) => {
    setComponent(event.target.value);
  };

  useEffect(() => {
    setComponent('');
  }, [list]);

  const listOfInputBuilder = [
    {
      id: 1,
      name: 'radio',
      component: <RadioInputBuilder componentList={list} setComponentList={setList} />,
    },
    {
      id: 2,
      name: 'select',
      component: <SelectInputBuilder componentList={list} setComponentList={setList} />,
    },
    {
      id: 3,
      name: 'checkbox',
      component: <CheckboxInputBuilder componentList={list} setComponentList={setList} />,
    },
    {
      id: 4,
      name: 'date',
      component: <DateInputBuilder componentList={list} setComponentList={setList} />,
    },
    {
      id: 5,
      name: 'number',
      component: <NumberInputBuilder componentList={list} setComponentList={setList} />,
    },
    {
      id: 6,
      name: 'text',
      component: <TextInputBuilder componentList={list} setComponentList={setList} />,
    },
    {
      id: 7,
      name: 'textarea',
      component: <TextAreaInputBuilder componentList={list} setComponentList={setList} />,
    },
  ];

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="selectInput-title">test selector</InputLabel>
        <Select labelId="selectInput-title" value={component} onChange={handleChange}>
          {listOfInputBuilder.map((inputBuilder) => (
            <MenuItem key={inputBuilder.id} value={inputBuilder.name}>
              {inputBuilder.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {component !== '' && (
        <>
          <br />
          <br />
          <div>{listOfInputBuilder.find((input) => input.name === component).component}</div>
        </>
      )}
    </div>
  );
}
