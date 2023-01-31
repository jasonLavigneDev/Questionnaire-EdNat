import React, { useContext, useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { TextField, Button, Paper } from '@mui/material';
import { createComponentObject, isDuplicate, isEmptyObject } from '../../utils/utils';
import { MsgError } from '../system/MsgError';
import { FormContext } from '../../contexts/FormContext';
import { v4 as uuidv4 } from 'uuid';

export const ComponentBuilder = ({ componentEdit = {}, type }) => {
  const [questionText, setQuestionText] = useState(componentEdit.title || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [answerOptions, setAnswerOptions] = useState(componentEdit.choices || []);

  const { form, setForm } = useContext(FormContext);

  const IsMultiAnswersComponent = () => {
    return type === 'checkboxInput' || type === 'selectInput' || type === 'radioButtonInput';
  };

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
    if (questionText) {
      if (IsMultiAnswersComponent() && !answerOptions) {
        setErrorMessage(i18n.__('builders.errors.noOptions'));
        return;
      }
      const componentListFinal = [...form.components];
      const newComponent = createComponentObject(questionText, type, answerOptions);
      componentListFinal.push(newComponent);
      setForm({ ...form, components: componentListFinal });
      setQuestionText('');
      setAnswerText('');
      setAnswerOptions([]);
    } else {
      setErrorMessage(i18n.__('builders.errors.noTitle'));
    }
  };

  const handleUpdate = () => {
    if (questionText) {
      if (IsMultiAnswersComponent() && !answerOptions) {
        setErrorMessage(i18n.__('builders.errors.noOptions'));
        return;
      }
      const componentListFinal = [...form.components];
      const index = componentListFinal.findIndex((component) => component.id === componentEdit.id);
      if (index !== -1) {
        componentListFinal[index] = createComponentObject(questionText, type, answerOptions);
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
      {IsMultiAnswersComponent() ? (
        <div>
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
        </div>
      ) : null}
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
