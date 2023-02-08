import React from 'react';
import { RadioInput } from '../inputs/RadioInput';
import { SelectInput } from '../inputs/SelectInput';
import { CheckBoxInput } from '../inputs/CheckboxInput';
import { DateInput } from '../inputs/DateInput';
import { NumberInput } from '../inputs/NumberInput';
import { TextInput } from '../inputs/TextInput';
import { TextArea } from '../inputs/TextArea';

export default function GenerateComponent({ currentComponent, getAnswer, answerMode }) {
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
  return <div>{generateComponent(currentComponent)}</div>;
}
