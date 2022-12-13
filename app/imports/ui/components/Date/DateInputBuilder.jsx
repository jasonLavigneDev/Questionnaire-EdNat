import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button, Paper } from '@mui/material';

import { DateInput } from './DateInput';

export const DateInputBuilder = ({ componentList, setComponentList }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title) {
      const newList = [...componentList];
      const newComponent = { id: newList.length + 10, name: 'dateInput', component: <DateInput title={title} /> };
      newList.push(newComponent);
      setComponentList(newList);
      setTitle('');
    } else {
      console.error('OSKOUR');
    }
  };

  return (
    <Paper>
      <TextField
        id="title"
        label="titre"
        variant="outlined"
        value={title}
        helperText="Entrez votre question"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <Button onClick={() => handleSubmit()}>Ajouter ce type d'input au formulaire</Button>
    </Paper>
  );
};

DateInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
