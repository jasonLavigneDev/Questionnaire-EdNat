import React from 'react';
import { InputBuilderAnswerRequired } from './InputBuilderAnswerRequired';
import { InputBuilderIcon } from './InputBuilderIcon';
import { InputBuilderTitle } from './InputBuilderTitle';

const container = {
  display: 'flex',
  width: '18vw',
  paddingLeft: '0.5vw',
  alignItems: 'center',
  height: '5vh',
};
export const InputBuilderMap = ({ currentComponent }) => {
  return (
    <div style={container}>
      <InputBuilderIcon currentComponent={currentComponent} />
      <InputBuilderTitle currentComponent={currentComponent} />
      {currentComponent.answerRequired && <InputBuilderAnswerRequired />}
    </div>
  );
};
