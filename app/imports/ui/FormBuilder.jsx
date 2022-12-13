import React, { useState } from 'react';

import { RadioInputBuilder } from './components/Radio/RadioInputBuilder';
import { SelectInputBuilder } from './components/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from './components/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from './components/Date/DateInputBuilder';
import { NumberInputBuilder } from './components/Number/NumberInputBuilder';
import { TextInputBuilder } from './components/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from './components/TextArea/TextAreaInputBuilder';

export const FormBuilder = () => {
  const [listOfComponentChooseByUser, setListOfComponentChooseByUser] = useState([]);

  const listOfInputBuilder = [
    {
      id: 1,
      name: 'radio',
      component: (
        <RadioInputBuilder
          componentList={listOfComponentChooseByUser}
          setComponentList={setListOfComponentChooseByUser}
        />
      ),
    },
    {
      id: 2,
      name: 'select',
      component: (
        <SelectInputBuilder
          componentList={listOfComponentChooseByUser}
          setComponentList={setListOfComponentChooseByUser}
        />
      ),
    },
    {
      id: 3,
      name: 'checkbox',
      component: (
        <CheckboxInputBuilder
          componentList={listOfComponentChooseByUser}
          setComponentList={setListOfComponentChooseByUser}
        />
      ),
    },
    {
      id: 4,
      name: 'date',
      component: (
        <DateInputBuilder
          componentList={listOfComponentChooseByUser}
          setComponentList={setListOfComponentChooseByUser}
        />
      ),
    },
    {
      id: 5,
      name: 'number',
      component: (
        <NumberInputBuilder
          componentList={listOfComponentChooseByUser}
          setComponentList={setListOfComponentChooseByUser}
        />
      ),
    },
    {
      id: 6,
      name: 'text',
      component: (
        <TextInputBuilder
          componentList={listOfComponentChooseByUser}
          setComponentList={setListOfComponentChooseByUser}
        />
      ),
    },
    {
      id: 7,
      name: 'textarea',
      component: (
        <TextAreaInputBuilder
          componentList={listOfComponentChooseByUser}
          setComponentList={setListOfComponentChooseByUser}
        />
      ),
    },
  ];

  const removeComponentToForm = (componentId) => {
    const newObj = listOfComponentChooseByUser.filter((componentInput) => componentInput.id != componentId);
    setListOfComponentChooseByUser(newObj);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h3 style={{ textAlign: 'center' }}>Presentation du formulaire créé avec vos inputs</h3>
        {listOfComponentChooseByUser.map((componentInput) => (
          <div key={componentInput.id}>
            <br />
            <br />
            <div>{componentInput.component}</div>
            <button onClick={() => removeComponentToForm(componentInput.id)}>Retirez cet input</button>
            <br />
            <br />
          </div>
        ))}
      </div>
      <div>
        <h3 style={{ textAlign: 'center' }}>Choix des inputs</h3>
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
    </div>
  );
};
