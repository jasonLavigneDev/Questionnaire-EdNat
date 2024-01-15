import React from 'react';

const paragraph = {
  maxHeight: '1.2rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflowY: 'hidden',
  overflow: 'hidden',
};
export const InputBuilderTitle = ({ currentComponent }) => {
  return <p style={paragraph}>{currentComponent.title}</p>;
};
