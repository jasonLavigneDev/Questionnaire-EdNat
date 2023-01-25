import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'meteor/universe:i18n';

import { TextField, Button, Paper } from '@mui/material';
import { createComponentObject, isEmptyObject } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';
import { SubmitButton } from '../../system/SubmitButton';
import { FormContext } from '../../../contexts/FormContext';

export const NumberInputBuilder = ({ componentEdit = {} }) => {
  const [questionText, setQuestionText] = useState(componentEdit.title || '');
  const [errorMessage, setErrorMessage] = useState('');
  const { form, setForm } = useContext(FormContext);

  const handleSubmit = () => {
    if (questionText) {
      const componentListFinal = [...form.components];
      const newComponent = createComponentObject(questionText, 'numberInput');
      componentListFinal.push(newComponent);
      setForm({ ...form, components: componentListFinal });
      setQuestionText('');
    } else {
      setErrorMessage(i18n.__('builders.errors.noTitle'));
    }
  };

  const handleUpdate = () => {
    if (questionText) {
      const componentListFinal = [...form.components];
      const index = componentListFinal.findIndex((component) => component.id === componentEdit.id);
      if (index !== -1) {
        componentListFinal[index] = createComponentObject(questionText, 'numberInput');
      } else {
        console.log('error, component does not exist');
      }
      setForm({ ...form, components: componentListFinal });
      setQuestionText('');
    } else {
      setErrorMessage(i18n.__('builders.errors.noTitle'));
    }
  };

  return (
    <Paper>
      <TextField
        id="questionText"
        label="Entrez le titre de la question"
        variant="outlined"
        value={questionText}
        helperText="Entrez votre question"
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <br />
      {isEmptyObject(componentEdit) ? (
        <Button style={{ textAlign: 'center', width: '100%' }} onClick={handleSubmit}>
          Validez cette question et ses possibilités de réponses
        </Button>
      ) : (
        <Button style={{ textAlign: 'center', width: '100%' }} onClick={handleUpdate}>
          Mettre à jour cette question et ses possibilités de réponses
        </Button>
      )}
      {errorMessage.length !== 0 ? <MsgError message={errorMessage} setMessage={setErrorMessage} /> : null}
    </Paper>
  );
};
