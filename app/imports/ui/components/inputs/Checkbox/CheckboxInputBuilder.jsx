import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'meteor/universe:i18n';
import { v4 as uuidv4 } from 'uuid';

import { TextField, Button, Paper } from '@mui/material';

import { createComponentObject, isDuplicate } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';
import AddSubmitButton from '../../selector';

export const CheckboxInputBuilder = ({ componentList, setComponentList }) => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');

  const addOption = (newOption) => {
    if (newOption) {
      const opt = [...options];
      if (!isDuplicate(opt, newOption)) {
        opt.push(newOption);
        setOptions(opt);
        setValue('');
      }
    } else {
      setMessage(i18n.__('builders.errors.noOptions'));
    }
  };

  const removeOption = (option) => {
    const opt = options.filter((o) => option !== o);
    setOptions(opt);
  };

  const handleSubmit = () => {
    if (title && options) {
      const componentListFinal = [...componentList];

      const newComponent = createComponentObject(title, 'checkboxInput', options);

      componentListFinal.push(newComponent);
      setComponentList(componentListFinal);
      setTitle('');
      setValue('');
      setOptions([]);
    } else {
      if (!title) {
        setMessage(i18n.__('builders.errors.noTitle'));
      }
      if (!options.length) {
        setMessage(i18n.__('builders.errors.noOptions'));
      }
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
        <div key={uuidv4()}>
          <p>{option}</p>
          <Button onClick={() => removeOption(option)}>Supprimez une option</Button>
        </div>
      ))}
      <br />
      <AddSubmitButton handleClick={handleSubmit} />
      {message.length !== 0 ? <MsgError message={message} setMessage={setMessage} /> : null}
    </Paper>
  );
};

CheckboxInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
