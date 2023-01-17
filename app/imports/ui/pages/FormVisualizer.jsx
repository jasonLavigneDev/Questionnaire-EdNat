import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';

export const FormVisualizer = () => {
  const form = useLoaderData();
  const component = form?.components;

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

export const loaderVisualizer = async ({ request, params }) => {
  const res = await Meteor.callAsync('forms.getOne', params.id);
  console.log('res', res);
  return res;
  // return await Meteor.callAsync('forms.getOne', params.id);
};
