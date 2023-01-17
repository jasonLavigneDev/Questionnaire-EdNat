import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';

export const FormPrevisualizer = () => {
  const { form, setForm } = useContext(FormContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  const components = form?.components;

  const handleSubmit = async () => {
    const result = await Meteor.callAsync('forms.createForm', {
      title: form.name,
      desc: form.description,
      owner: user._id,
      isModel: false,
      isPublic: false,
      groups: [],
      components: components,
    });
    if (!result) {
      console.log('error');
    } else {
      navigate('/home');
      setForm({});
    }
  };

  return (
    <div>
      {form ? (
        <div>
          <h3 style={{ textAlign: 'center' }}>{form.name}</h3>
          <h4 style={{ textAlign: 'center' }}>{form.description}</h4>
          <Visualizer form={components} />
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}

      <Button onClick={() => navigate('/form/builder')}>Retour</Button>
      <Button onClick={() => handleSubmit()}>Enregistrer le résultat</Button>
    </div>
  );
};
