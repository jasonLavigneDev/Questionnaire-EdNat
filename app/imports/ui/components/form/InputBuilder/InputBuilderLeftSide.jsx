import React from 'react';
import { InputChoice } from '../InputChoice';
import i18n from 'meteor/universe:i18n';

export const InputBuilderLeftSide = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
      <h3>{i18n.__('component.inputBuilder.inputType')}</h3>
      {<InputChoice />}
    </div>
  );
};
