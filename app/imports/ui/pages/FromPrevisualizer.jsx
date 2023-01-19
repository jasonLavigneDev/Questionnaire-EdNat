import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';

export const FormPrevisualizer = () => {
  const { form, resetFormContext, setActiveStep } = useContext(FormContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const result = await Meteor.callAsync('forms.createForm', {
      title: form.title,
      desc: form.description,
      owner: user._id,
      isModel: false,
      isPublic: form.public,
      groups: [],
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
          <h3 style={{ textAlign: 'center' }}>{form.title}</h3>
          <h4 style={{ textAlign: 'center' }}>{form.description}</h4>
          <Visualizer />
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}

      <Button onClick={() => navigate('/builder/components')}>Retour</Button>
      <Button onClick={() => handleSubmit()}>Enregistrer le résultat</Button>
    </div>
  );
};
