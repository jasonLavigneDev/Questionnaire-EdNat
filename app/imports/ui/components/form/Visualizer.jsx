import React from 'react';

import { RadioInput } from '../inputs/Radio/RadioInput';
import { SelectInput } from '../inputs/Select/SelectInput';
import { CheckBoxInput } from '../inputs/Checkbox/CheckboxInput';
import { DateInput } from '../inputs/Date/DateInput';
import { NumberInput } from '../inputs/Number/NumberInput';
import { TextInput } from '../inputs/TextInput/TextInput';
import { TextArea } from '../inputs/TextArea/TextArea';

export default function Visualizer({ form, setForm, edit = false }) {
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

  const removeComponentToForm = (componentId) => {
    const newObj = form.filter((componentInput) => componentInput.id != componentId);
    setForm(newObj);
  };

  return (
    <div>
      {form.map((componentInput) => (
        <div key={componentInput.id}>
          <br />
          <br />
          <div>{generateComponent(componentInput)}</div>
          {edit && <button onClick={() => removeComponentToForm(componentInput.id)}>Retirez cet input</button>}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
