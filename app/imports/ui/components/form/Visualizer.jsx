import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Button } from '@mui/material';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';

import { RadioInput } from '../inputs/Radio/RadioInput';
import { SelectInput } from '../inputs/Select/SelectInput';
import { CheckBoxInput } from '../inputs/Checkbox/CheckboxInput';
import { DateInput } from '../inputs/Date/DateInput';
import { NumberInput } from '../inputs/Number/NumberInput';
import { TextInput } from '../inputs/TextInput/TextInput';
import { TextArea } from '../inputs/TextArea/TextArea';
import { FormContext } from '../../contexts/FormContext';
import { AnswerContext } from '../../contexts/AnswerContext';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { hasAlreadyRespond } from '../../utils/utils';
import { ComponentBuilder } from '../inputs/ComponentBuilder';

export const Visualizer = ({ completeForm, answerMode = false, edit = false }) => {
  const { form, setForm } = useContext(FormContext);
  const { user, isAuthenticated } = useContext(UserContext);

  const answers = completeForm?.formAnswers?.find((answer) => answer.userId == user.username);
  const navigate = useNavigate();

  const { answerForm, setAnswerForm } = useContext(AnswerContext);

  const [publicName, setPublicName] = useState('');
  const [builder, setBuilder] = useState({});

  const getAnswer = (id) => {
    if (answerMode) return answers?.answers.find((answer) => answer.questionId == id);
    else return {};
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
  const hasComponentAfter = (inputPos) => inputPos < form.components.length - 1;

  const removeComponentToForm = (componentId) => {
    const newObj = form.components.filter((componentInput) => componentInput.id != componentId);
    setForm({ ...form, components: newObj });
  };

  const swapPositionWithPreviousComponent = (inputPos) => {
    if (hasComponentBefore(inputPos)) {
      const newObj = [...form.components];
      [newObj[inputPos - 1], newObj[inputPos]] = [newObj[inputPos], newObj[inputPos - 1]];
      setForm({ ...form, components: newObj });
    } else {
      console.log("Il n'y a pas de question avant celle ci, impossible de swap");
    }
  };

  const swapPositionWithNextComponent = (inputPos) => {
    if (hasComponentAfter(inputPos)) {
      const newObj = [...form.components];
      [newObj[inputPos + 1], newObj[inputPos]] = [newObj[inputPos], newObj[inputPos + 1]];
      setForm({ ...form, components: newObj });
    } else {
      console.log("Il n'y a pas de question apres celle ci, impossible de swap");
    }
  };

  const submitAnswerForm = async () => {
    const newObj = { ...answerForm };
    newObj.formId = completeForm._id;

    newObj.userId = isAuthenticated ? user.username : publicName;

    setAnswerForm(newObj);
    await Meteor.callAsync('forms.updateAnswers', newObj.formId, { userId: newObj.userId, answers: newObj.answers });
    navigate('/');
  };

  const editComponent = (component) => {
    setBuilder(component);
  };

  useEffect(() => {
    if (answers) setAnswerForm(answers);
  }, []);

  if (isAuthenticated || form.isPublic) {
    return (
      <div>
        {<h3 style={{ textAlign: 'center' }}>{form.title}</h3>}
        {<h4 style={{ textAlign: 'center' }}>{form.desc}</h4>}
        {form.components.map((componentInput, index) => (
          <div key={componentInput.id}>
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>{generateComponent(componentInput)}</div>
            {builder && builder.id === componentInput.id ? (
              <div>
                <ComponentBuilder componentEdit={componentInput} type={componentInput.type} />
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
                  {/* {hasComponentAfter(index, form) && ( */}
                  <IconButton onClick={() => swapPositionWithNextComponent(index)}>
                    <ArrowDownwardIcon />
                  </IconButton>
                </div>
                {/* )} */}
                <IconButton sx={{ color: 'Gold' }} onClick={() => editComponent(componentInput)}>
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ color: 'Crimson' }} onClick={() => removeComponentToForm(componentInput.id)}>
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
            {!user && (
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
            )}
            {user && (
              <Button onClick={submitAnswerForm}>
                {hasAlreadyRespond(user, completeForm)
                  ? 'Mettre à jour les réponses'
                  : 'Soumettre ce formulaire complété'}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <p>Veuillez vous connecter pour répondre a ce questionnaire</p>;
  }
};
