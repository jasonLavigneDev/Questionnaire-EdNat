import React, { useContext, useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { TextField, Button, Paper, Checkbox, FormControlLabel, Divider } from '@mui/material';
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
        setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
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
      setErrorMessage(i18n.__('component.componentBuilder.errors.noTitle'));
    }
  };

  const updateComponent = () => {
    if (questionText) {
      if (IsMultiAnswersComponent() && !answerOptions) {
        setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
        return;
      }
      const componentListFinal = [...currentForm.components];
      const index = componentListFinal.findIndex((component) => component.id === componentToEdit.id);
      if (index !== -1) {
        componentListFinal[index] = createComponentObject(questionText, type, answerOptions, answerIsRequired);
      } else {
        setErrorMessage(i18n.__('component.componentBuilder.errors.notFound'));
        return;
      }
      setCurrentForm({ ...currentForm, components: componentListFinal });
      setQuestionText('');
      setAnswerText('');
      setAnswerOptions([]);
      setEditMode(false);
    } else {
      if (!questionText) {
        setErrorMessage(i18n.__('component.componentBuilder.errors.noTitle'));
      }
    }
  };

  return (
    <Paper>
      <div key={'test'} style={{ display: 'flex', marginLeft: '2.5vw' }}>
        <FormControlLabel
          control={<Checkbox name="required" checked={answerIsRequired} />}
          label="réponse obligatoire"
          onChange={() => setAnswerIsRequired(!answerIsRequired)}
        />
      </div>
      <Divider variant="middle" />
      <TextField
        id="questionText"
        label={i18n.__('component.componentBuilder.questionTitle')}
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
          {i18n.__('component.componentBuilder.submit')}
        </Button>
      ) : (
        <Button style={{ textAlign: 'center', width: '100%' }} onClick={updateComponent}>
          {i18n.__('component.componentBuilder.update')}
        </Button>
      )}
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
    </Paper>
  );
};
