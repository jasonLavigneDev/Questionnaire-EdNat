import React, { useContext, useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { TextField, Button, Paper, Checkbox, FormControlLabel } from '@mui/material';
import { createComponentObject, isEmptyComponent } from '../utils/utils';
import { MsgError } from './system/MsgError';
import { FormContext } from '../contexts/FormContext';

import ManageOptions from './ManageOptions';

export const ComponentBuilder = ({ componentToEdit = {}, type, setEditMode = null }) => {
  const [questionText, setQuestionText] = useState(componentToEdit.title || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [answerOptions, setAnswerOptions] = useState(componentToEdit.choices || []);
  const [answerIsRequired, setAnswerIsRequired] = useState(componentToEdit.answerRequired || false);

  const { currentForm, setCurrentForm } = useContext(FormContext);

  const IsMultiAnswersComponent = () => {
    return type === 'checkboxInput' || type === 'selectInput' || type === 'radioButtonInput';
  };

  const submitComponent = () => {
    if (questionText) {
      if (IsMultiAnswersComponent() && !answerOptions) {
        setErrorMessage(i18n.__('builders.errors.noOptions'));
        return;
      }
      const componentListFinal = [...currentForm.components];
      const newComponent = createComponentObject(questionText, type, answerOptions, answerIsRequired);
      componentListFinal.push(newComponent);
      setCurrentForm({ ...currentForm, components: componentListFinal });
      setQuestionText('');
      setAnswerText('');
      setAnswerOptions([]);
    } else {
      setErrorMessage(i18n.__('builders.errors.noTitle'));
    }
  };

  const updateComponent = () => {
    if (questionText) {
      if (IsMultiAnswersComponent() && !answerOptions) {
        setErrorMessage(i18n.__('builders.errors.noOptions'));
        return;
      }
      const componentListFinal = [...currentForm.components];
      const index = componentListFinal.findIndex((component) => component.id === componentToEdit.id);
      if (index !== -1) {
        componentListFinal[index] = createComponentObject(questionText, type, answerOptions, answerIsRequired);
      } else {
        console.log('error, component does not exist');
      }
      setCurrentForm({ ...currentForm, components: componentListFinal });
      setQuestionText('');
      setAnswerText('');
      setAnswerOptions([]);
      setEditMode(false);
    } else {
      if (!questionText) {
        setErrorMessage(i18n.__('builders.errors.noTitle'));
      }
    }
  };

  return (
    <Paper>
      <div key={'test'}>
        <FormControlLabel
          control={<Checkbox name="required" checked={answerIsRequired} />}
          label="réponse obligatoire"
          onChange={() => setAnswerIsRequired(!answerIsRequired)}
        />
      </div>
      <TextField
        id="questionText"
        label="Entrez le titre de la question"
        variant="outlined"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        sx={{ width: '90%', marginLeft: 6, marginBottom: 2, marginTop: 2 }}
      />

      {IsMultiAnswersComponent() && (
        <ManageOptions
          answerText={answerText}
          setAnswerText={setAnswerText}
          answerOptions={answerOptions}
          setAnswerOptions={setAnswerOptions}
          setErrorMessage={setErrorMessage}
        />
      )}
      {isEmptyComponent(componentToEdit) ? (
        <Button style={{ textAlign: 'center', width: '100%', marginTop: 1 }} onClick={submitComponent}>
          Valider
        </Button>
      ) : (
        <Button style={{ textAlign: 'center', width: '100%' }} onClick={updateComponent}>
          Mettre à jour
        </Button>
      )}
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
    </Paper>
  );
};
