import React from 'react';

import { RadioInputBuilder } from '../inputs/Radio/RadioInputBuilder';
import { SelectInputBuilder } from '../inputs/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from '../inputs/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from '../inputs/Date/DateInputBuilder';
import { NumberInputBuilder } from '../inputs/Number/NumberInputBuilder';
import { TextInputBuilder } from '../inputs/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from '../inputs/TextArea/TextAreaInputBuilder';

export default function InputChoice({ list, setList }) {
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
      {listOfInputBuilder.map((inputBuilder) => (
        <div key={inputBuilder.id}>
          <p style={{ textAlign: 'center' }}>Input de type : {inputBuilder.name}</p>
          <br />
          <br />
          <div>{inputBuilder.component}</div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
