import React, { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { FormContext } from '../contexts/FormContext';

export const FormVisualizer = () => {
  const { setCurrentForm } = useContext(FormContext);
  const formFromBDD = useLoaderData();

  useEffect(() => {
    setCurrentForm(formFromBDD);
  }, []);

  if (!formFromBDD) return <p>Ce formulaire n'existe pas</p>;

  return <Visualizer answerMode={true} />;
};

export const loaderVisualizer = async ({ params }) => {
  return (await Meteor.callAsync('forms.getOne', params.id)) || null;
};
