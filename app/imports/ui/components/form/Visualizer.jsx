import React, { useContext, useEffect } from 'react';

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

export const Visualizer = ({ completeForm, answerMode = false, edit = false }) => {
  const { form, setForm } = useContext(FormContext);
  const { user } = useContext(UserContext);
  const { answerForm, setAnswerForm } = useContext(AnswerContext);

  const generateComponent = (component) => {
    switch (component.type) {
      case 'checkboxInput':
        return (
          <CheckBoxInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
          />
        );
      case 'selectInput':
        return (
          <SelectInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
          />
        );
      case 'radioButtonInput':
        return (
          <RadioInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
          />
        );
      case 'dateInput':
        return <DateInput title={component.title} answerMode={answerMode} questionId={component.id} />;
      case 'numberInput':
        return <NumberInput title={component.title} answerMode={answerMode} questionId={component.id} />;
      case 'textInput':
        return <TextInput title={component.title} answerMode={answerMode} questionId={component.id} />;
      case 'textArea':
        return <TextArea title={component.title} answerMode={answerMode} questionId={component.id} />;
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

  const submitAnswerForm = () => {
    const newObj = { ...answerForm };
    newObj.formId = completeForm._id;
    newObj.userId = user._id;
    console.log('le formulaire de reponse a envoyer', answerForm);
    setAnswerForm(newObj);
  };

  useEffect(() => {
    setAnswerForm({
      userId: '',
      formId: '',
      answers: [],
    });
  }, []);

  return (
    <div>
      {form.components.map((componentInput, index) => (
        <div key={componentInput.id}>
          <br />
          <br />
          <div>{generateComponent(componentInput)}</div>
          {edit && (
            <div style={{ display: 'flex' }}>
              <button onClick={() => removeComponentToForm(componentInput.id)}>Retirez cet input</button>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* {hasComponentBefore(index) && ( */}
                <button onClick={() => swapPositionWithPreviousComponent(index)}>haut</button>
                {/* )} */}
                {/* {hasComponentAfter(index, form) && ( */}
                <button onClick={() => swapPositionWithNextComponent(index)}>bas</button>
                {/* )} */}
              </div>
            </div>
          )}
          <br />
          <br />
        </div>
      ))}
      {answerMode && (
        <div>
          <p>mode reponse </p>
          <button onClick={submitAnswerForm}>Soumettre ce formulaire complété</button>
        </div>
      )}
    </div>
  );
};
