import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useLoaderData } from 'react-router-dom';

import Forms from '../../api/forms/forms';
import Visualizer from '../components/form/Visualizer';

export const FormPrevisualizer = () => {
  const { _id } = useLoaderData();

  const [ready, setReady] = useState(false);

  const form = useTracker(() => {
    const subForm = Meteor.subscribe('forms.one', { _id });
    setReady(subForm.ready());
    return Forms.findOne({ _id });
  }, []);

  const component = form?.components;

  if (!ready) return <p>BIG SPINNER</p>;

  return (
    <div>
      {form ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>{form.title}</h3>
          <h4 style={{ textAlign: 'center' }}>{form.desc}</h4>
          <Visualizer form={component} />
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
