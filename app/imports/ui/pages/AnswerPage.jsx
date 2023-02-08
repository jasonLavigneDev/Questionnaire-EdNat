import React, { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { FormContext } from '../contexts/FormContext';

export const AnswerPage = () => {
  const { setCurrentForm } = useContext(FormContext);
  const formFromBDD = useLoaderData();

  useEffect(() => {
    setCurrentForm(formFromBDD);
  }, []);

  if (!formFromBDD) return <p>Ce formulaire n'existe pas</p>;

  return <Visualizer answerMode={true} />;
};

export const loaderVisualizer = async ({ params }) => {
  const userForm = await Meteor.callAsync('forms.getOne', params.id);
  return userForm || null;
};