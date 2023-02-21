import React, { useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { TextField, Button, Paper, Checkbox, FormControlLabel, Divider } from '@mui/material';
import { isDuplicate } from '../utils/utils';
import { MsgError } from './system/MsgError';
import ManageOptions from './ManageOptions';
import { useDispatch, useSelector } from 'react-redux';
import { addComponents } from '../redux/slices/formSlice';
import {
  addAnswerOptions,
  addQuestionText,
  resetAnswerText,
  resetQuestionObject,
  toggleAnswerIsRequired,
} from '../redux/slices/questionSlice';
import { v4 as uuidv4 } from 'uuid';

export const ComponentBuilder = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const form = useSelector((state) => state.form);
  const question = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const IsMultiAnswersComponent = () => {
    return question.type === 'checkboxInput' || question.type === 'selectInput' || question.type === 'radioButtonInput';
  };

  const addOption = (newOption) => {
    if (newOption) {
      if (!isDuplicate(question.choices, newOption)) {
        dispatch(addAnswerOptions({ choices: newOption }));
        dispatch(resetAnswerText());
      }
    } else {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
    }
  };

  // const createComponentObject =  () => {
  //   const component = {
  //     id: uuidv4(),
  //     title: question.title,
  //     type: question.type,
  //     choices: choicesTest,
  //     answerRequired: question.answerRequired,
  //   };
  //   return component;
  // };

  const submitComponent = () => {
    if (question.title) {
      if (IsMultiAnswersComponent() && (!question.choices || question.choices.length == 0)) {
        setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
        return;
      }

      if (question.answerText !== '') {
        addOption(question.answerText);
      }

      choicesAlreadySubmit = [...question.choices];
      choicesAlreadySubmit.push(question.answerText);

      const newComponent = {
        id: uuidv4(),
        title: question.title,
        type: question.type,
        choices: choicesAlreadySubmit,
        answerRequired: question.answerRequired,
      };

      dispatch(addComponents(newComponent));
      dispatch(resetQuestionObject());
    } else {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noTitle'));
    }
  };

  const updateComponent = () => {
    if (question.title) {
      if (IsMultiAnswersComponent() && !question.choices) {
        setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
        return;
      }
      const componentListFinal = [...form.components];
      const index = componentListFinal.findIndex((component) => component.id === question.id);
      // if (index !== -1) {
      //   componentListFinal[index] = createComponentObject(
      //     question.title,
      //     question.type,
      //     question.choices,
      //     question.answerRequired,
      //   );
      // } else {
      //   setErrorMessage(i18n.__('component.componentBuilder.errors.notFound'));
      //   return;
      // }
      dispatch(addComponents(componentListFinal));
      dispatch(resetQuestionObject());
    } else {
      if (!question.title) {
        setErrorMessage(i18n.__('component.componentBuilder.errors.noTitle'));
      }
    }
  };

  return (
    <Paper>
      <div key={'test'} style={{ display: 'flex', marginLeft: '2.5vw' }}>
        <FormControlLabel
          control={<Checkbox name="required" checked={question.answerRequired} />}
          label="réponse obligatoire"
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
      {IsMultiAnswersComponent() && <ManageOptions setErrorMessage={setErrorMessage} />}
      {question.id === '' ? (
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
