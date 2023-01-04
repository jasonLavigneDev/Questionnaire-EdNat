import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Visualizer from '../components/form/Visualizer';

export const FormPrevisualizer = () => {
  const form = useLoaderData();
  const component = form?.components;

  return (
    <div>
      {form ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>{form.title}</h3>
          <h4 style={{ textAlign: 'center' }}>{form.desc}</h4>
          <Visualizer form={component} />
          <Link to={`/`}>retour</Link>
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}
    </div>
  );
};

export const previzualizerRoute = {
  path: 'previsualizer/:id',
  loader: async ({ request, params }) => {
    return await Meteor.callAsync('forms.getOne', params.id);
  },
  element: <FormPrevisualizer />,
};
