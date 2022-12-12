import React, { useState } from 'react';
import { RadioButtonBuilder } from './components/radioButton/radioButtonBuilder';
import { SelectBuilder } from './components/select/selectBuilder';
// import { Modal, Box, Typography, Select, MenuItem, Button } from '@mui/material';

export const FormBuilder = () => {
  // ARRAY OF COMPONENT INPUTS TO DISPLAY

  const components = [];

  const [componentInputs, setComponentInputs] = useState(components);

  const addComponentToForm = (componentName) => {
    const componentObj = components.filter((component) => component.name === componentName);
    const newObj = [...componentInputs];
    newObj.push(componentObj[0]);
    setComponentInputs(newObj);
  };

  const removeComponentToForm = (componentId) => {
    const newObj = componentInputs.filter((component) => component.name != componentId);
    setComponentInputs(newObj);
  };

  // SIMULATE AN ADD COMPONENT FROM LIST
  const componentName = 'component5';

  // SIMULATE AN COMPONENT NAME ID TO REMOVE
  const componentIdToRemove = 'component3';

  console.log(components);

  return (
    <div>
      {componentInputs.map((componentInput) => componentInput.component)}
      <button onClick={() => addComponentToForm(componentName)}>CLICK FOR ADD COMPONENT</button>
      <button onClick={() => removeComponentToForm(componentIdToRemove)}>CLICK FOR REMOVE</button>
      <SelectBuilder component={componentInputs} setComponent={setComponentInputs} />
      <RadioButtonBuilder component={componentInputs} setComponent={setComponentInputs} />
    </div>
  );
};
