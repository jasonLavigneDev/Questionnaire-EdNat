import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { FormContext } from '../contexts/FormContext';

export const FormPrevisualizer = () => {
  const { form, resetFormContext, setActiveStep } = useContext(FormContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
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
        <p>Ce formulaire n'existe pas</p>
      )}

      <Button onClick={() => navigate('/builder/components')}>Retour sur la création de questions</Button>
      <Button onClick={() => handleSubmit()}>Enregistrer ce questionnaire</Button>
    </div>
  );
};
