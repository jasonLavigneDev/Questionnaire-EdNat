import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'meteor/universe:i18n';

import { TextField, Paper } from '@mui/material';
import { createComponentObject } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';
import AddSubmitButton from '../../selector';
import { FormContext } from '../../../contexts/FormContext';

export const TextAreaInputBuilder = ({ componentList, setComponentList }) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { form, setForm } = useContext(FormContext);

  const handleSubmit = () => {
    if (title) {
      const componentListFinal = [...componentList];
      const newComponent = createComponentObject(title, 'textArea');
      componentListFinal.push(newComponent);
      setForm({ ...form, components: componentListFinal });
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
      <AddSubmitButton handleClick={handleSubmit} />
      {message.length !== 0 ? <MsgError message={message} setMessage={setMessage} /> : null}
    </Paper>
  );
};

TextAreaInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
