// ***************************** Without Library Form **************************************** //
// TODO : Rewrite the Form component
import React from 'react';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/core';

export const InputTest = () => {
  const InputsArray = [
    {
      title: 'First Input',
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', title: 'Title', default: 'A new task' },
        done: { type: 'boolean', title: 'Done?', default: false },
      },
    },
    {
      title: 'Second Input',
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', title: 'Title', default: 'A new task' },
        done: { type: 'boolean', title: 'Done?', default: false },
      },
    },
    {
      title: 'Third Input',
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', title: 'Title', default: 'A new task' },
        done: { type: 'boolean', title: 'Done?', default: false },
      },
    },
  ];

  return (
    <div>
      {InputsArray.map((input) => (
        <Form
          schema={input}
          validator={validator}
          onChange={(e) => console.log('onChange', e)}
          onSubmit={(e) => console.log('OnSubmit', e)}
          onError={(e) => console.log('OnError', e)}
        />
      ))}
    </div>
  );
};
