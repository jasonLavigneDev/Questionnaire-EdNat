import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'meteor/universe:i18n';

import { TextField, Button, Paper } from '@mui/material';
import { createComponentObject } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';

export const NumberInputBuilder = ({ componentList, setComponentList }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (title) {
      const componentListFinal = [...componentList];
      const newComponent = createComponentObject(title, 'numberInput');
      componentListFinal.push(newComponent);
      setComponentList(componentListFinal);
      setTitle('');
    } else {
      setMessage(i18n.__('builders.errors.noTitle'));
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
      {message.length && <MsgError message={message} setMessage={setMessage} />}
    </Paper>
  );
};

NumberInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
