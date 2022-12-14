import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { TextField, Button } from '@mui/material';

import { RadioInputBuilder } from './components/Radio/RadioInputBuilder';
import { SelectInputBuilder } from './components/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from './components/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from './components/Date/DateInputBuilder';
import { NumberInputBuilder } from './components/Number/NumberInputBuilder';
import { TextInputBuilder } from './components/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from './components/TextArea/TextAreaInputBuilder';

import { RadioInput } from './components/Radio/RadioInput';
import { SelectInput } from './components/Select/SelectInput';
import { CheckBoxInput } from './components/Checkbox/CheckboxInput';
import { DateInput } from './components/Date/DateInput';
import { NumberInput } from './components/Number/NumberInput';
import { TextInput } from './components/TextInput/TextInput';
import { TextArea } from './components/TextArea/TextArea';

const FormPrevisualizer = ({ form, ready }) => {
  if (!ready) return null;

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

  return (
    <div>
      {form.components.map((componentInput) => (
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
  );
};

FormPrevisualizer.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(({ _id }) => {
  const subForm = Meteor.subscribe('forms.one', { _id });
  const form = Forms.findOne(_id) || {};
  const ready = subForm.ready();
  return {
    ready,
    form,
  };
})(FormPrevisualizer);
