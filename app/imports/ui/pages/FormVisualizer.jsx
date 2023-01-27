import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { MsgError } from '../components/system/MsgError';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';

export const FormVisualizer = () => {
  const formFromBDD = useLoaderData();

  const { form, setForm } = useContext(FormContext);
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setForm(formFromBDD);
  }, []);

  return (
    <div>
      {form ? (
        <div>
          <Visualizer answerMode={true} completeForm={form} />
        </div>
      ) : (
        <p>Ce formulaire n'existe pas</p>
      )}
    </div>
  );
};

export const loaderVisualizer = async ({ params }) => {
  return (await Meteor.callAsync('forms.getOne', params.id)) || null;
};
