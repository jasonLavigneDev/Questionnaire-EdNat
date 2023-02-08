import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormContext } from '../contexts/FormContext';

import { MsgError } from '../components/system/MsgError';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { InputBuilder } from '../components/form/InputBuilder';

export const FormBuilder = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { currentForm, setActiveStep } = useContext(FormContext);
  const navigate = useNavigate();
  const isDisable = !currentForm.title || currentForm.components.length === 0;
  const haveErrorMessages = errorMessage.length;

  const navigateToNextStep = () => {
    if (isDisable) {
      setErrorMessage('Le formulaire ne contient pas de titre ou de questions');
    } else {
      navigate('/builder/previsualizer');
    }
  };

  useEffect(() => {
    setActiveStep(1);
  }, []);

  return (
    <>
      <Breadcrumb />
      <InputBuilder />
      {haveErrorMessages && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
      <br />
      <Footer nextStep={navigateToNextStep} urlOfPrevStep="builder/intro" text="Suivant" />
    </>
  );
};
