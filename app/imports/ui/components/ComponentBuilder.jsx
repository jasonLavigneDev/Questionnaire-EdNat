import React, { useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { TextField, Button, Paper, Checkbox, FormControlLabel, Divider } from '@mui/material';
import { MsgError } from './system/MsgError';
import ManageOptions from './ManageOptions';
import { useDispatch, useSelector } from 'react-redux';
import { addComponents, updateComponent } from '../redux/slices/formSlice';
import { addQuestionText, resetQuestionObject, toggleAnswerIsRequired } from '../redux/slices/questionSlice';
import { v4 as uuidv4 } from 'uuid';
import { IsLayoutComponent } from '../utils/utils';

export const ComponentBuilder = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const form = useSelector((state) => state.form);
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const IsMultiAnswersComponent = () => {
    return question.type === 'checkboxInput' || question.type === 'selectInput' || question.type === 'radioButtonInput';
  };

  const setTitleOfComponent = () => {
    const index = form.components.filter((component) => component.type === question.type).length + 1;
    if (IsLayoutComponent(question) && question.type !== 'sectionStart')
      return `${i18n.__(`component.inputs.${question.type}`)} ${index}`;
    return question.title;
  };

  const submitComponent = (action) => {
    if (!question.title && (!IsLayoutComponent(question) || question.type == 'sectionStart')) {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noTitle'));
      return;
    }

    if (IsMultiAnswersComponent() && (!question.choices || question.choices.length == 0)) {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
      return;
    }

    if (action === 'create') {
      const newComponent = {
        id: uuidv4(),
        title: setTitleOfComponent(),
        type: question.type,
        choices: question.choices,
        answerRequired: question.answerRequired,
      };
      dispatch(addComponents(newComponent));
      dispatch(resetQuestionObject());
      return;
    } else if (action === 'update') {
      const componentUpdated = {
        id: question.id,
        title: setTitleOfComponent(),
        type: question.type,
        choices: question.choices,
        answerRequired: question.answerRequired,
      };
      dispatch(updateComponent(componentUpdated));
      dispatch(resetQuestionObject());
      return;
    }
  };

  return (
    <Paper sx={{ height: '50vh', overflow: 'auto', overflowX: 'unset' }}>
      {!IsLayoutComponent(question) ? (
        <div>
          <div style={{ display: 'flex', marginLeft: '2.5vw' }}>
            <FormControlLabel
              control={<Checkbox name="required" checked={question.answerRequired} />}
              label={i18n.__('component.componentBuilder.obligatoryAnswer')}
              onChange={() => dispatch(toggleAnswerIsRequired())}
            />
          </div>

          <Divider variant="middle" />
          <TextField
            id="questionText"
            label={i18n.__('component.componentBuilder.questionTitle')}
            variant="outlined"
            value={question.title}
            onChange={(e) => dispatch(addQuestionText({ title: e.target.value }))}
            sx={{ width: '90%', marginLeft: 6, marginBottom: 2, marginTop: 2 }}
          />
        </div>
      ) : question.type === 'sectionStart' ? (
        <TextField
          id="questionText"
          label={i18n.__('component.componentBuilder.sectionTitle')}
          variant="outlined"
          value={question.title}
          onChange={(e) => dispatch(addQuestionText({ title: e.target.value }))}
          sx={{ width: '90%', marginLeft: 6, marginBottom: 2, marginTop: 2 }}
        />
      ) : null}
      {IsMultiAnswersComponent() && <ManageOptions setErrorMessage={setErrorMessage} />}
      {question.id === '' ? (
        <div style={{ textAlign: 'center', width: '100%', marginTop: 1 }}>
          <Button variant="contained" onClick={() => submitComponent('create')} sx={{ margin: 1, width: '20%' }}>
            {i18n.__('component.componentBuilder.submit')}
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', width: '100%', marginTop: 1 }}>
          <Button variant="contained" sx={{ margin: 1, width: '20%' }} onClick={() => submitComponent('update')}>
            {i18n.__('component.componentBuilder.update')}
          </Button>
        </div>
      )}
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
    </Paper>
  );
};
