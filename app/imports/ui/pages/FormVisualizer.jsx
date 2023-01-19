import React, { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { FormContext } from '../contexts/FormContext';

export const FormVisualizer = () => {
  const formFromBDD = useLoaderData();

  const { form, setForm } = useContext(FormContext);

  useEffect(() => {
    setForm(formFromBDD);
  }, []);

  return (
    <div>
      {form ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>{form.title}</h3>
          <h4 style={{ textAlign: 'center' }}>{form.desc}</h4>
          <Visualizer answerMode={true} completeForm={form} />
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}
    </div>
  );
};

export const loaderVisualizer = async ({ params }) => {
  return await Meteor.callAsync('forms.getOne', params.id);
};