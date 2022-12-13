import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import PropTypes from 'prop-types';

import { TextInput } from './TextInput';

export const TextInputBuilder = ({ component, setComponent }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title) {
      const componentList = [...component];
      const newComponent = { name: 'textInput', component: <TextInput title={title} /> };
      componentList.push(newComponent);
      setComponent(componentList);
      setTitle('');
    } else {
      console.error('OSKOUR');
    }
  };

  return (
    <Paper>
      <TextField id="title" label="titre" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Button onClick={() => handleSubmit()}>SUbmit</Button>
    </Paper>
  );
};

TextInputBuilder.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponent: PropTypes.func.isRequired,
};
