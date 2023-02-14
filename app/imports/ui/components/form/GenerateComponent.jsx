import React from 'react';
import { RadioInput } from '../inputs/RadioInput';
import { SelectInput } from '../inputs/SelectInput';
import { CheckBoxInput } from '../inputs/CheckboxInput';
import { DateInput } from '../inputs/DateInput';
import { NumberInput } from '../inputs/NumberInput';
import { TextInput } from '../inputs/TextInput';
import { TextArea } from '../inputs/TextArea';

export default function GenerateComponent({ currentComponent, answerMode }) {
  const generateComponent = (component) => {
    switch (component.type) {
      case 'checkboxInput':
        return (
          <CheckBoxInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'selectInput':
        return (
          <SelectInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'radioButtonInput':
        return (
          <RadioInput
            title={component.title}
            choices={component.choices}
            answerMode={answerMode}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'dateInput':
        return (
          <DateInput
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'numberInput':
        return (
          <NumberInput
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'textInput':
        return (
          <TextInput
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'textArea':
        return (
          <TextArea
            title={component.title}
            answerMode={answerMode}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
    }
  };
  return <div>{generateComponent(currentComponent)}</div>;
}
