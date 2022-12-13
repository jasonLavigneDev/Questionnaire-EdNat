import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button, Paper } from '@mui/material';

import { isDuplicate } from '../../utilis/utils';
import RadioInput from './RadioInput';

export const RadioInputBuilder = ({ componentList, setComponentList }) => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const addOption = (option) => {
    if (option) {
      const opt = [...options];
      if (!isDuplicate(opt, option)) {
        opt.push(option);
        setOptions(opt);
        setValue('');
      }
    } else {
      console.error('empty option');
    }
  };

  const removeOption = (option) => {
    const opt = options.filter((o) => option !== o);
    setOptions(opt);
  };

  const handleSubmit = () => {
    if (title && options) {
      const newList = [...componentList];
      const newComponent = {
        id: newList.length + 10,
        name: 'radioButtonInput',
        component: <RadioInput title={title} choices={options} />,
      };
      newList.push(newComponent);
      setComponentList(newList);
      setTitle('');
      setValue('');
      setOptions([]);
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
      <TextField
        id="option"
        label="option"
        variant="outlined"
        value={value}
        helperText="Entrez un choix de reponse"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => addOption(value)}>Ajoutez cette option</Button>
      {options.map((option) => (
        <>
          <p>{option}</p>
          <Button onClick={() => removeOption(option)}>Supprimez cette option</Button>
        </>
      ))}
      <br />
      <Button onClick={() => handleSubmit()}>Ajouter ce type d'input au formulaire</Button>
    </Paper>
  );
};

RadioInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
