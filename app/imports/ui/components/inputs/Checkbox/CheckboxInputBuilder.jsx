import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'meteor/universe:i18n';
import { v4 as uuidv4 } from 'uuid';

import { TextField, Button, Paper } from '@mui/material';

import { createComponentObject, isDuplicate, isEmptyObject } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';
import { GlobalStateContext } from '../../../contexts/GlobalStateContext';

export const CheckboxInputBuilder = ({ componentEdit = {} }) => {
  const [questionText, setQuestionText] = useState(componentEdit.title || '');
  const [answerText, setAnswerText] = useState('');
  const [answerOptions, setAnswerOptions] = useState(componentEdit.choices || []);
  const [errorMessage, setErrorMessage] = useState('');

  const { form, setForm } = useContext(GlobalStateContext);

  const addOption = (newOption) => {
    if (newOption) {
      const opt = [...answerOptions];
      if (!isDuplicate(opt, newOption)) {
        opt.push(newOption);
        setAnswerOptions(opt);
        setAnswerText('');
      }
    } else {
      setErrorMessage(i18n.__('builders.errors.noOptions'));
    }
  };

  const removeOption = (option) => {
    const opt = answerOptions.filter((o) => option !== o);
    setAnswerOptions(opt);
  };

  const handleSubmit = () => {
    if (questionText && answerOptions) {
      const componentListFinal = [...form.components];

      const newComponent = createComponentObject(questionText, 'checkboxInput', answerOptions);

      componentListFinal.push(newComponent);
      setForm({ ...form, components: componentListFinal });
      setQuestionText('');
      setAnswerText('');
      setAnswerOptions([]);
    } else {
      if (!questionText) {
        setErrorMessage(i18n.__('builders.errors.noTitle'));
      }
      if (!answerOptions.length) {
        setErrorMessage(i18n.__('builders.errors.noOptions'));
      }
    }
  };

  const handleUpdate = () => {
    if (questionText && answerOptions) {
      const componentListFinal = [...form.components];
      const index = componentListFinal.findIndex((component) => component.id === componentEdit.id);
      if (index !== -1) {
        componentListFinal[index] = createComponentObject(questionText, 'checkboxInput', answerOptions);
      } else {
        console.log('error, component does not exist');
      }
      setForm({ ...form, components: componentListFinal });
      setQuestionText('');
      setAnswerText('');
      setAnswerOptions([]);
    } else {
      if (!questionText) {
        setErrorMessage(i18n.__('builders.errors.noTitle'));
      }
      if (!answerOptions.length) {
        setErrorMessage(i18n.__('builders.errors.noOptions'));
      }
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
      <TextField
        id="option"
        label="Entrez un choix de réponse"
        variant="outlined"
        value={answerText}
        helperText="Entrez un choix de reponse"
        onChange={(e) => setAnswerText(e.target.value)}
      />
      <Button onClick={() => addOption(answerText)}>Ajoutez ce choix de réponse</Button>
      {answerOptions.map((option) => (
        <div style={{ display: 'flex' }} key={uuidv4()}>
          <p>{option}</p>
          <Button onClick={() => removeOption(option)}>Supprimez ce choix de réponse</Button>
        </div>
      ))}
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
      {errorMessage.length !== 0 ? <MsgError error={errorMessage} setError={setErrorMessage} /> : null}
    </Paper>
  );
};
