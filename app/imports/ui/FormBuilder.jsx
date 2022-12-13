import React, { useState } from 'react';

import { SelectBuilder } from './components/select/selectBuilder';
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
