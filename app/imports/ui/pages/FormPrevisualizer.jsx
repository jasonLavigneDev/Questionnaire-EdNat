import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { MsgError } from '../components/system/MsgError';
import { FormContext } from '../contexts/FormContext';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';

export const FormPrevisualizer = () => {
  const { form, resetFormContext, setActiveStep } = useContext(FormContext);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const isDisable = !form.title || form.components.length === 0;

  const handleSubmit = async () => {
    if (isDisable) {
      setErrorMessage('Le formulaire ne contient pas de titre ou de questions');
    } else {
      const result = await Meteor.callAsync('forms.createForm', {
        title: form.title,
        desc: form.desc,
        isModel: false,
        groups: form.groups,
        isPublic: form.isPublic,
        components: form.components,
      });
      if (!result) {
        console.log('error');
      } else {
        navigate('/');
        resetFormContext();
      }
    }
  };

  const handleUpdate = async () => {
    if (isDisable) {
      setErrorMessage('Le formulaire ne contient pas de titre ou de questions');
    } else {
      const result = await Meteor.callAsync('forms.updateForm', {
        id: form._id,
        title: form.title,
        desc: form.desc,
        isModel: false,
        groups: form.groups,
        isPublic: form.isPublic,
        components: form.components,
      });
      if (!result) {
        console.log('error');
      } else {
        navigate('/');
        resetFormContext();
      }
    }
  };

  useEffect(() => {
    setActiveStep(2);
  }, []);

  return (
    <div>
      {form ? (
        <div>
          <Breadcrumb />
          <Visualizer />
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}
      {errorMessage.length !== 0 ? <MsgError message={errorMessage} setMessage={setErrorMessage} /> : null}
      <Footer
        handleSubmit={form._id ? handleUpdate : handleSubmit}
        urlComponentPrec="builder/components"
        text={form._id ? 'Mettre à jour le formulaire' : 'Enregistrer le résultat'}
      />
    </div>
  );
};
