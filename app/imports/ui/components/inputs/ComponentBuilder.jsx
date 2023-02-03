import React, { useContext, useState } from 'react';
import { i18n } from 'meteor/universe:i18n';

import { TextField, Button, Paper, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { createComponentObject, isDuplicate, isEmptyComponent } from '../../utils/utils';
import { MsgError } from '../system/MsgError';
import { FormContext } from '../../contexts/FormContext';
import { v4 as uuidv4 } from 'uuid';

export const ComponentBuilder = ({ componentToEdit = {}, type, setEditMode = null }) => {
  const [questionText, setQuestionText] = useState(componentToEdit.title || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [answerOptions, setAnswerOptions] = useState(componentToEdit.choices || []);

  const { currentForm, setCurrentForm } = useContext(FormContext);

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
      const componentListFinal = [...currentForm.components];
      const newComponent = createComponentObject(questionText, type, answerOptions);
      componentListFinal.push(newComponent);
      setCurrentForm({ ...currentForm, components: componentListFinal });
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
      const componentListFinal = [...currentForm.components];
      const index = componentListFinal.findIndex((component) => component.id === componentToEdit.id);
      if (index !== -1) {
        componentListFinal[index] = createComponentObject(questionText, type, answerOptions);
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
      <TextField
        id="questionText"
        label="Entrez le titre de la question"
        variant="outlined"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        sx={{ width: '90%', marginLeft: 6, marginBottom: 2, marginTop: 2 }}
      />
      {IsMultiAnswersComponent() && (
        <>
          <br />
          <div style={{ display: 'flex' }}>
            <TextField
              id="option"
              label="Entrez un choix de réponse"
              variant="outlined"
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              sx={{ width: '85%', marginLeft: 6 }}
            />
            <IconButton onClick={() => addOption(answerText)}>
              <AddIcon fontSize="large" />
            </IconButton>
          </div>
          {answerOptions.map((option) => (
            <>
              <div
                style={{ display: 'flex', maxWidth: '42.6vw', marginLeft: '3vw', justifyContent: 'space-between' }}
                key={uuidv4()}
              >
                <p>{option}</p>
                <IconButton onClick={() => removeOption(option)}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <Divider variant="middle" />
            </>
          ))}
          <br />
        </>
      )}
      {isEmptyComponent(componentToEdit) ? (
        <Button style={{ textAlign: 'center', width: '100%', marginTop: 1 }} onClick={handleSubmit}>
          Valider
        </Button>
      ) : (
        <Button style={{ textAlign: 'center', width: '100%' }} onClick={handleUpdate}>
          Mettre à jour
        </Button>
      )}
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
    </Paper>
  );
};
