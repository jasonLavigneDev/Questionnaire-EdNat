import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useLoaderData } from 'react-router-dom';
import { RadioInput } from '../components/Radio/RadioInput';
import { SelectInput } from '../components/Select/SelectInput';
import { CheckBoxInput } from '../components/Checkbox/CheckboxInput';
import { DateInput } from '../components/Date/DateInput';
import { NumberInput } from '../components/Number/NumberInput';
import { TextInput } from '../components/TextInput/TextInput';
import { TextArea } from '../components/TextArea/TextArea';
import Forms from '../../api/forms/forms';

export const FormPrevisualizer = () => {
  const { _id } = useLoaderData();

  const [ready, setReady] = useState(false);

  const form = useTracker(() => {
    const subForm = Meteor.subscribe('forms.one', { _id });
    setReady(subForm.ready());
    return Forms.findOne({ _id });
  }, []);

  console.log(ready);
  if (!ready) return <p>BIG SPINNER</p>;

  const generateComponent = (component) => {
    switch (component.type) {
      case 'checkboxInput':
        return <CheckBoxInput title={component.title} choices={component.choices} />;
      case 'dateInput':
        return <DateInput title={component.title} />;
      case 'selectInput':
        return <SelectInput title={component.title} choices={component.choices} />;
      case 'numberInput':
        return <NumberInput title={component.title} />;
      case 'radioButtonInput':
        return <RadioInput title={component.title} choices={component.choices} />;
      case 'textInput':
        return <TextInput title={component.title} />;
      case 'textArea':
        return <TextArea title={component.title} />;
    }
  };

  return (
    <div>
      {form ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>{form.title}</h3>
          <h4 style={{ textAlign: 'center' }}>{form.desc}</h4>
          {form.components.map((componentInput) => (
            <div key={componentInput.id}>
              <br />
              <br />
              <div>{generateComponent(componentInput)}</div>
              <br />
              <br />
            </div>
          ))}
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}
    </div>
  );
};

export const previzualizerRoute = {
  path: '/previsualizer/:_id',
  loader: async ({ request, params }) => {
    const _id = params._id;
    return { _id };
  },
  element: <FormPrevisualizer />,
};
