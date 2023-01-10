import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { Visualizer } from '../components/form/Visualizer';

export const FormPrevisualizer = () => {
  const form = useLoaderData();

  return (
    <div>
      {form ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>{form.title}</h3>
          <h4 style={{ textAlign: 'center' }}>{form.desc}</h4>
          <Visualizer form={form.components} />
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}
    </div>
  );
};

export const loader = async ({ params }) => {
  return await Meteor.callAsync('forms.getOne', params.id);
};
