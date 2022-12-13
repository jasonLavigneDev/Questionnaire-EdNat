import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { createComponentObject, isDuplicate } from '../../utilis/utils';

export const CheckboxBuilder = ({ component, setComponent }) => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState(['oui', 'non']);

  const addOption = (option) => {
    if (option) {
      const opt = [...options];
      if (!isDuplicate(opt, option)) {
        opt.push(option);
        setOptions(opt);
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
      const componentList = [...component];
      const newComponent = createComponentObject(title, 'checkboxInput', options);
      componentList.push(newComponent);
      setComponent(componentList);
    } else {
      console.error('OSKOUR');
    }
  };

  return (
    <Paper>
      Checkbox builder:
      <TextField id="title" label="titre" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField
        id="option"
        label="option"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => addOption(value)}>Add</Button>
      {options.map((option) => (
        <>
          <p>{option}</p>
          <Button onClick={() => removeOption(option)}>delete</Button>
        </>
      ))}
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </Paper>
  );
};

CheckboxBuilder.propTypes = {
  component: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponent: PropTypes.func.isRequired,
};
