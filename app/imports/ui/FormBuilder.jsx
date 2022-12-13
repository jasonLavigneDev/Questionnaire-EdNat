import React, { useState } from 'react';
import { Button } from '@mui/material';
import { RadioInputBuilder } from './components/Radio/RadioInputBuilder';
import { SelectInputBuilder } from './components/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from './components/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from './components/Date/DateInputBuilder';
import { NumberInputBuilder } from './components/Number/NumberInputBuilder';
import { TextInputBuilder } from './components/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from './components/TextArea/TextAreaInputBuilder';
import CheckBoxInput from './components/Checkbox/CheckboxInput';
import { DateInput } from './components/Date/DateInput';
import SelectInput from './components/Select/SelectInput';
import NumberInput from './components/Number/NumberInput';
import RadioInput from './components/Radio/RadioInput';
import { TextInput } from './components/TextInput/TextInput';
import { TextArea } from './components/TextArea/TextArea';

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

  const generateComponent = (component) => {
    switch (component.type) {
      case 'checkboxInput':
        return <CheckBoxInput title={component.title} choices={component.choices} />;
      case 'dateInput':
        return <DateInput title={component.title} />;
      case 'selectInput':
        return <SelectInput title={component.title} choices={component.choices} />;
      case 'numberInput':
        return <NumberInput title={component.title} />;
      case 'radioButtonInput':
        return <RadioInput title={component.title} choices={component.choices} />;
      case 'textInput':
        return <TextInput title={component.title} />;
      case 'textArea':
        return <TextArea title={component.title} />;
    }
  };

  const handleSubmit = () => {
    Meteor.call(
      'forms.createForm',
      {
        title: 'Test',
        desc: 'Test desc',
        owner: 'test_user',
        isModel: false,
        isPublic: false,
        groups: [],
        components: listOfComponentChooseByUser,
      },
      (err) => {
        if (err) {
          console.log(err.reason);
        } else {
          console.log('success');
        }
      },
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <h3 style={{ textAlign: 'center' }}>Presentation du formulaire créé avec vos inputs</h3>
          {listOfComponentChooseByUser.map((componentInput) => (
            <div key={componentInput.id}>
              <br />
              <br />
              <div>{generateComponent(componentInput)}</div>
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
      <Button onClick={() => handleSubmit()}>Enregistrer le formulaire</Button>
    </div>
  );
};
