import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { MsgError } from '../components/system/MsgError';
import { FormContext } from '../contexts/FormContext';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';

export const FormPrevisualizer = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const { currentForm, resetFormContext, setActiveStep } = useContext(FormContext);

  const navigate = useNavigate();

  const isDisable = !currentForm.title || currentForm.components.length === 0;

  const sendFormToBDD = async () => {
    if (isDisable) return setErrorMessage('Le formulaire ne contient pas de titre ou de questions');

    try {
      const result = await Meteor.callAsync('forms.createForm', {
        title: currentForm.title,
        desc: currentForm.desc,
        isModel: false,
        groups: currentForm.groups,
        isPublic: currentForm.isPublic,
        components: currentForm.components,
      });

      if (result) {
        navigate('/');
        resetFormContext();
      }
    } catch (error) {
      console.log('error dans sendForm', error);
    }
  };

  const updateForm = async () => {
    if (isDisable) return setErrorMessage('Le formulaire ne contient pas de titre ou de questions');

    try {
      const result = await Meteor.callAsync('forms.updateForm', {
        id: currentForm._id,
        title: currentForm.title,
        desc: currentForm.desc,
        isModel: false,
        groups: currentForm.groups,
        isPublic: currentForm.isPublic,
        components: currentForm.components,
      });

      if (result) {
        navigate('/');
        resetFormContext();
      }
    } catch (err) {
      console.log('error dans updateForm', err);
    }
  };

  useEffect(() => {
    setActiveStep(2);
  }, []);

  return (
    <div>
      {currentForm ? (
        <div>
          <Breadcrumb />
          <Visualizer />
        </div>
      ) : (
        <p>ce formulaire n'existe pas</p>
      )}
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
      <Footer
        nextStep={currentForm._id ? updateForm : sendFormToBDD}
        urlOfPrevStep="builder/components"
        text={currentForm._id ? 'Mettre à jour le formulaire' : 'Enregistrer le résultat'}
      />
    </div>
  );
};
