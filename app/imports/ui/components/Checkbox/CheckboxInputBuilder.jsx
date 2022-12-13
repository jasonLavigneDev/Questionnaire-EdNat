import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button, Paper } from '@mui/material';

import { isDuplicate } from '../../utilis/utils';
import CheckboxInput from './CheckboxInput';

export const CheckboxInputBuilder = ({ componentList, setComponentList }) => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const addOption = (newOption) => {
    if (newOption) {
      const opt = [...options];
      if (!isDuplicate(opt, newOption)) {
        opt.push(newOption);
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
        name: 'checkboxInput',
        component: <CheckboxInput title={title} choices={options} />,
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
      <Button onClick={() => addOption(value)}>Ajoutez une option</Button>
      {options.map((option) => (
        <>
          <p>{option}</p>
          <Button onClick={() => removeOption(option)}>Supprimez une option</Button>
        </>
      ))}
      <br />
      <Button onClick={() => handleSubmit()}>Ajouter ce type d'input au formulaire</Button>
    </Paper>
  );
};

CheckboxInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
