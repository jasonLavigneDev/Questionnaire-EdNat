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
    if (isDisable) {
      setErrorMessage('Le formulaire ne contient pas de titre ou de questions');
    } else {
      // possible de try catch ?
      const result = await Meteor.callAsync('forms.createForm', {
        title: currentForm.title,
        desc: currentForm.desc,
        isModel: false,
        groups: currentForm.groups,
        isPublic: currentForm.isPublic,
        components: currentForm.components,
      });
      if (!result) {
        console.log('error');
      } else {
        navigate('/');
        resetFormContext();
      }
    }
  };

  const updateForm = async () => {
    if (isDisable) {
      setErrorMessage('Le formulaire ne contient pas de titre ou de questions');
    } else {
      //try catch ?
      const result = await Meteor.callAsync('forms.updateForm', {
        id: currentForm._id,
        title: currentForm.title,
        desc: currentForm.desc,
        isModel: false,
        groups: currentForm.groups,
        isPublic: currentForm.isPublic,
        components: currentForm.components,
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
        navigateToNextStep={currentForm._id ? updateForm : sendFormToBDD}
        urlOfPrevStep="builder/components"
        text={currentForm._id ? 'Mettre à jour le formulaire' : 'Enregistrer le résultat'}
      />
    </div>
  );
};
