import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { i18n } from 'meteor/universe:i18n';

import { TextField, Button, Paper } from '@mui/material';
import { createComponentObject, isDuplicate } from '../../../utils/utils';
import { MsgError } from '../../system/MsgError';
import { SubmitButton } from '../../system/SubmitButton';
import { FormContext } from '../../../contexts/FormContext';

export const RadioInputBuilder = ({ componentList, setComponentList }) => {
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
    if (questionText && answerOptions) {
      const componentListFinal = [...componentList];
      const newComponent = createComponentObject(questionText, 'radioButtonInput', answerOptions);
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
        label="Question"
        variant="outlined"
        value={questionText}
        helperText="Entrez votre question"
        onChange={(e) => setQuestionText(e.target.value)}
      />
      <br />
      <TextField
        id="answerText"
        label="Reponse"
        variant="outlined"
        value={answerText}
        helperText="Entrez un choix de reponse"
        onChange={(e) => setAnswerText(e.target.value)}
      />
      <Button onClick={() => addOption(answerText)}>Ajoutez ce choix de reponse</Button>
      {answerOptions.map((option) => (
        <div key={uuidv4()}>
          <p>{option}</p>
          <Button onClick={() => removeOption(option)}>Supprimez ce choix de reponse</Button>
        </div>
      ))}
      <br />
      <SubmitButton handleClick={handleSubmit} />
      {errorMessage.length !== 0 ? <MsgError error={errorMessage} setError={setErrorMessage} /> : null}
    </Paper>
  );
};

RadioInputBuilder.propTypes = {
  componentList: PropTypes.arrayOf(PropTypes.any).isRequired,
  setComponentList: PropTypes.func.isRequired,
};
