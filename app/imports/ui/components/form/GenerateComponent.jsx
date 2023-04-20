import React from 'react';
import { RadioInput } from '../inputs/RadioInput';
import { SelectInput } from '../inputs/SelectInput';
import { CheckBoxInput } from '../inputs/CheckboxInput';
import { DateInput } from '../inputs/DateInput';
import { NumberInput } from '../inputs/NumberInput';
import { TextInput } from '../inputs/TextInput';
import { TextArea } from '../inputs/TextArea';
import { SectionStart } from '../inputs/SectionStart';
import { SectionEnd } from '../inputs/SectionEnd';
import { Separator } from '../inputs/Separator';

export default function GenerateComponent({ currentComponent }) {
  const generateComponent = (component) => {
    switch (component.type) {
      case 'checkboxInput':
        return (
          <CheckBoxInput
            title={component.title}
            choices={component.choices}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'selectInput':
        return (
          <SelectInput
            title={component.title}
            choices={component.choices}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'radioButtonInput':
        return (
          <RadioInput
            title={component.title}
            choices={component.choices}
            questionId={component.id}
            answerRequired={component.answerRequired}
          />
        );
      case 'dateInput':
        return (
          <DateInput title={component.title} questionId={component.id} answerRequired={component.answerRequired} />
        );
      case 'numberInput':
        return (
          <NumberInput title={component.title} questionId={component.id} answerRequired={component.answerRequired} />
        );
      case 'textInput':
        return (
          <TextInput title={component.title} questionId={component.id} answerRequired={component.answerRequired} />
        );
      case 'textArea':
        return <TextArea title={component.title} questionId={component.id} answerRequired={component.answerRequired} />;
      case 'sectionStart':
        return <SectionStart title={component.title} />;
      case 'separator':
        return <Separator />;
      case 'sectionEnd':
        return <SectionEnd />;
    }
  };
  return <div>{generateComponent(currentComponent)}</div>;
}
