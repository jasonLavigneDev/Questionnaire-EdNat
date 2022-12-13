import React, { useState } from 'react';
import { RadioButtonBuilder } from './components/radioButton/radioButtonBuilder';
import { SelectBuilder } from './components/select/selectBuilder';
import { CheckboxBuilder } from './components/checkbox/checkboxBuilder';
import { DateInputBuilder } from './components/DateInput/DateInputBuilder';
import { NumberInputBuilder } from './components/Number/NumberInputBuilder';
// import { Modal, Box, Typography, Select, MenuItem, Button } from '@mui/material';

import { TextInputBuilder } from './components/TextInput/TextInputBuilder';
import { TextAreaBuilder } from './components/TextArea/TextAreaBuilder';

export const FormBuilder = () => {
  const [componentInputs, setComponentInputs] = useState([]);

  // const addComponentToForm = (componentName) => {
  //   const componentObj = components.filter((component) => component.name === componentName);
  //   const newObj = [...componentInputs];
  //   newObj.push(componentObj[0]);
  //   setComponentInputs(newObj);
  // };

  // const removeComponentToForm = (componentId) => {
  //   const newObj = componentInputs.filter((component) => component.name != componentId);
  //   setComponentInputs(newObj);
  // };

  // // SIMULATE AN ADD COMPONENT FROM LIST
  // const componentName = 'component5';

  // // SIMULATE AN COMPONENT NAME ID TO REMOVE
  // const componentIdToRemove = 'component3';

  return (
    <div>
      {componentInputs.map((componentInput) => (
        <>
          {componentInput.component}
          <br />
          <br />
        </>
      ))}
      <br />
      <br />
      {/* <button onClick={() => addComponentToForm(componentName)}>CLICK FOR ADD COMPONENT</button>
      <button onClick={() => removeComponentToForm(componentIdToRemove)}>CLICK FOR REMOVE</button> */}
      <SelectBuilder component={componentInputs} setComponent={setComponentInputs} />
      <CheckboxBuilder component={componentInputs} setComponent={setComponentInputs} />
      <DateInputBuilder component={componentInputs} setComponent={setComponentInputs} />
      <RadioButtonBuilder component={componentInputs} setComponent={setComponentInputs} />
      <NumberInputBuilder component={componentInputs} setComponent={setComponentInputs} />
      <br />
      <br />
      <TextInputBuilder component={componentInputs} setComponent={setComponentInputs} />
      <br />
      <br />
      <TextAreaBuilder component={componentInputs} setComponent={setComponentInputs} />
      <br />
      <br />
    </div>
  );
};
