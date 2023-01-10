import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'meteor/universe:i18n';

import { TextField, Button, Paper } from '@mui/material';
import { createComponentObject } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';
import { SubmitButton } from '../../system/SubmitButton';
import { FormContext } from '../../../contexts/FormContext';

export const DateInputBuilder = ({ componentList, setComponentList }) => {
  const [questionText, setQuestionText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { form, setForm } = useContext(FormContext);

  const handleSubmit = () => {
    if (questionText) {
      const componentListFinal = [...componentList];
      const newComponent = createComponentObject(questionText, 'dateInput');
      componentListFinal.push(newComponent);
      setForm({ ...form, components: componentListFinal });
      setComponentList(componentListFinal);
      setQuestionText('');
    } else {
      setErrorMessage(i18n.__('builders.errors.noTitle'));
    }
  };

  return (
    <Paper>
      <TextField
        id="questionText"
        label="Question"
        variant="outlined"
        value={questionText}
        helperText="Entrez votre question"
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <br />
      <SubmitButton handleClick={handleSubmit} />
      {errorMessage.length !== 0 ? <MsgError message={errorMessage} setErrorMessage={setErrorMessage} /> : null}
    </Paper>
  );
};

DateInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
