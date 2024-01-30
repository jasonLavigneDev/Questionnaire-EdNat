import React from 'react';
import i18n from 'meteor/universe:i18n';
import { InputBuilderComponentsMap } from './InputBuilderComponentsMap';

const container = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '5vw',
  width: '45%',
};

export const InputBuilderRightSide = () => {
  return (
    <div style={container}>
      <h3>{i18n.__('component.inputBuilder.inputOrder')}</h3>
      <InputBuilderComponentsMap />
    </div>
  );
};
