import React from 'react';
import { InputBuilderLeftSide } from './InputBuilderLeftSide';
import { InputBuilderRightSide } from './InputBuilderRightSide';

const container = {
  display: 'flex',
  flexDirection: 'row',
  maxHeight: '100%',
  justifyContent: 'space-evenly',
};

export const InputBuilder = () => {
  return (
    <div style={container}>
      <InputBuilderLeftSide />
      <InputBuilderRightSide />
    </div>
  );
};
