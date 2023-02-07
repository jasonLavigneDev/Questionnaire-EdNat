import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';

import { RadioInput } from '../inputs/RadioInput';
import { SelectInput } from '../inputs/SelectInput';
import { CheckBoxInput } from '../inputs/CheckboxInput';
import { DateInput } from '../inputs/DateInput';
import { NumberInput } from '../inputs/NumberInput';
import { TextInput } from '../inputs/TextInput';
import { TextArea } from '../inputs/TextArea';
import { FormContext } from '../../contexts/FormContext';
import { AnswerContext } from '../../contexts/AnswerContext';
import { useNavigate } from 'react-router-dom';
import { hasAlreadyRespond } from '../../utils/utils';
import { ComponentBuilder } from '../inputs/ComponentBuilder';
import useUser from '../../hooks/useUser';

export const Visualizer = ({ answerMode = false, edit = false }) => {
  const [publicName, setPublicName] = useState('');
  const [componentToEdit, setComponentToEdit] = useState({});

  const { currentForm, setCurrentForm } = useContext(FormContext);
  // const { user, user } = useContext(UserContext);
  const [user] = useUser();
  const { answerForm, setAnswerForm } = useContext(AnswerContext);

  const navigate = useNavigate();

  const currentFormHasAnswers = !!currentForm.formAnswers;

  let userAnswers = null;

  if (user && currentFormHasAnswers) {
    userAnswers = currentForm.formAnswers.find((answer) => answer.userId == user.username); // answer.userID devrait etre answers.username en BDD
  }

  const getAnswer = (id) => {
    if (answerMode && userAnswers) return userAnswers.answers.find((answer) => answer.questionId == id);
    return {};
  };

  const generateComponent = (component) => {
    switch (component.type) {
      case 'checkboxInput':
        return (
          <CheckBoxInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
            answer={getAnswer(component.id)}
          />
        );
      case 'selectInput':
        return (
          <SelectInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
            answer={getAnswer(component.id)}
          />
        );
      case 'radioButtonInput':
        return (
          <RadioInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
            answer={getAnswer(component.id)}
          />
        );
      case 'dateInput':
        return (
          <DateInput
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answer={getAnswer(component.id)}
          />
        );
      case 'numberInput':
        return (
          <NumberInput
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answer={getAnswer(component.id)}
          />
        );
      case 'textInput':
        return (
          <TextInput
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answer={getAnswer(component.id)}
          />
        );
      case 'textArea':
        return (
          <TextArea
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answer={getAnswer(component.id)}
          />
        );
    }
  };

  const hasComponentBefore = (inputPos) => inputPos > 0;
  const hasComponentAfter = (inputPos) => inputPos < currentForm.components.length - 1;

  const removeComponentToForm = (componentId) => {
    const componentsUpdated = currentForm.components.filter((currentComponent) => currentComponent.id != componentId);
    setCurrentForm({ ...currentForm, components: componentsUpdated });
  };

  // GROSSE DUPLICATION DE CODE AVEC LISTVIZUALIZER

  const swapPositionWithPreviousComponent = (inputPos) => {
    if (hasComponentBefore(inputPos)) {
      const componentsUpdated = [...currentForm.components];
      [componentsUpdated[inputPos - 1], componentsUpdated[inputPos]] = [
        componentsUpdated[inputPos],
        componentsUpdated[inputPos - 1],
      ];
      setCurrentForm({ ...currentForm, components: componentsUpdated });
    } else {
      console.log("Il n'y a pas de question avant celle ci, impossible de swap");
    }
  };

  const swapPositionWithNextComponent = (inputPos) => {
    if (hasComponentAfter(inputPos)) {
      const componentsUpdated = [...currentForm.components];
      [componentsUpdated[inputPos + 1], componentsUpdated[inputPos]] = [
        componentsUpdated[inputPos],
        componentsUpdated[inputPos + 1],
      ];
      setCurrentForm({ ...currentForm, components: componentsUpdated });
    } else {
      console.log("Il n'y a pas de question apres celle ci, impossible de swap");
    }
  };

  const submitAnswerForm = async () => {
    const componentsUpdated = { ...answerForm };
    componentsUpdated.formId = currentForm._id;

    componentsUpdated.userId = user ? user.username : publicName;

    setAnswerForm(componentsUpdated);
    await Meteor.callAsync('forms.updateAnswers', componentsUpdated.formId, {
      userId: componentsUpdated.userId,
      answers: componentsUpdated.answers,
    });
    navigate('/');
  };

  const editComponent = (component) => {
    setComponentToEdit(component);
  };

  useEffect(() => {
    if (userAnswers) setAnswerForm(userAnswers);
  }, []);

  if (!user && !currentForm.isPublic) return <p>Veuillez vous connecter pour répondre a ce questionnaire</p>;

  // IL SEMBLE QUE edit NE SOIS JAMAIS PASSER EN PROPS DONC EDIT === FALSE toujours

  return (
    <div>
      {<h3 style={{ textAlign: 'center' }}>{currentForm.title}</h3>}
      {<h4 style={{ textAlign: 'center' }}>{currentForm.desc}</h4>}
      {currentForm.components.map((currentComponent, index) => (
        <div key={currentComponent.id}>
          <br />
          <br />
          <div>{generateComponent(currentComponent)}</div>
          {componentToEdit && componentToEdit.id === currentComponent.id ? (
            <div>
              <ComponentBuilder componentToEdit={currentComponent} type={currentComponent.type} />
            </div>
          ) : null}
          {edit && (
            <div style={{ display: 'flex' }}>
              <div style={{ flexDirection: 'column' }}>
                {/* {hasComponentBefore(index) && ( */}
                <IconButton onClick={() => swapPositionWithPreviousComponent(index)}>
                  <ArrowUpwardIcon />
                </IconButton>
                {/* )} */}
                {/* {hasComponentAfter(index, currentForm) && ( */}
                <IconButton onClick={() => swapPositionWithNextComponent(index)}>
                  <ArrowDownwardIcon />
                </IconButton>
              </div>
              {/* )} */}
              <IconButton sx={{ color: 'Gold' }} onClick={() => editComponent(currentComponent)}>
                <EditIcon />
              </IconButton>
              <IconButton sx={{ color: 'Crimson' }} onClick={() => removeComponentToForm(currentComponent.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          <br />
          <br />
        </div>
      ))}
      {answerMode && (
        <div>
          {!user ? (
            <div>
              <input
                type="text"
                name="yourName"
                id="yourName"
                value={publicName}
                placeholder={'entrez votre nom'}
                onChange={(e) => setPublicName(e.target.value)}
              />
              <Button disabled={!publicName} onClick={submitAnswerForm}>
                Soumettre ce formulaire complété
              </Button>
            </div>
          ) : (
            <Button onClick={submitAnswerForm}>
              {hasAlreadyRespond(user, currentForm) ? 'Mettre à jour les réponses' : 'Soumettre ce formulaire complété'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
