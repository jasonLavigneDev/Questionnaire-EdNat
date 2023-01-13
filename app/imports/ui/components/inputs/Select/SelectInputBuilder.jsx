import React, { useContext, useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { TextField, Button, Paper } from '@mui/material';
import { createComponentObject, isDuplicate } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';
import { SubmitButton } from '../../system/SubmitButton';
import { FormContext } from '../../../contexts/FormContext';

export const SelectInputBuilder = ({ componentList, setComponentList }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [answerOptions, setAnswerOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { form, setForm } = useContext(FormContext);

  const addOption = (option) => {
    if (option) {
      const opt = [...answerOptions];
      if (!isDuplicate(opt, option)) {
        opt.push(option);
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
    if (questionText && answerOptions.length) {
      const componentListFinal = [...componentList];
      const newComponent = createComponentObject(questionText, 'selectInput', answerOptions);
      componentListFinal.push(newComponent);
      setForm({ ...form, components: componentListFinal });
      setComponentList(componentListFinal);
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
        label="titre"
        variant="outlined"
        value={questionText}
        helperText="Entrez votre question"
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <br />

      <TextField
        id="option"
        label="option"
        variant="outlined"
        value={answerText}
        helperText="Entrez un choix de reponse"
        onChange={(e) => setAnswerText(e.target.value)}
      />
      <Button onClick={() => addOption(answerText)}>Ajoutez cette option</Button>
      {answerOptions.map((option) => (
        <div key={uuidv4()}>
          <p>{option}</p>
          <Button onClick={() => removeOption(option)}>Supprimez cette option</Button>
        </div>
      ))}
      <br />
      <SubmitButton handleClick={handleSubmit} />
      {errorMessage.length != 0 ? <MsgError message={errorMessage} setMessage={setErrorMessage} /> : null}
    </Paper>
  );
};

SelectInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
