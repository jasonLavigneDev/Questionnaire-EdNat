import React, { useEffect } from 'react';

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

  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos, form) => inputPos < form.length - 1;

  const removeComponentToForm = (componentId) => {
    const newObj = form.filter((componentInput) => componentInput.id != componentId);
    setForm(newObj);
  };

  const swapPositionWithPreviousComponent = (inputPos) => {
    if (hasComponentBefore(inputPos)) {
      const newObj = [...form];
      const temp = newObj[inputPos - 1];
      newObj[inputPos - 1] = newObj[inputPos];
      newObj[inputPos] = temp;
      setForm(newObj);
    } else {
      console.log("Il n'y a pas de question avant celle ci, impossible de swap");
    }
  };

  const swapPositionWithNextComponent = (inputPos) => {
    if (hasComponentAfter(inputPos, form)) {
      const newObj = [...form];
      const temp = newObj[inputPos + 1];
      newObj[inputPos + 1] = newObj[inputPos];
      newObj[inputPos] = temp;
      setForm(newObj);
    } else {
      console.log("Il n'y a pas de question apres celle ci, impossible de swap");
    }
  };

  return (
    <div>
      {form.map((componentInput, index) => (
        <div key={componentInput.id}>
          <br />
          <br />
          <div>{generateComponent(componentInput)}</div>
          {edit && (
            <div style={{ display: 'flex' }}>
              <button onClick={() => removeComponentToForm(componentInput.id)}>Retirez cet input</button>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* {hasComponentBefore(index) && ( */}
                <button onClick={() => swapPositionWithPreviousComponent(index)}>haut</button>
                {/* )} */}
                {/* {hasComponentAfter(index, form) && ( */}
                <button onClick={() => swapPositionWithNextComponent(index)}>bas</button>
                {/* )} */}
              </div>
            </div>
          )}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
