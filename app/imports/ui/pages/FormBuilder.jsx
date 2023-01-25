import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { InputChoice } from '../components/form/InputChoice';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';
import { MsgError } from '../components/system/MsgError';
import { useState } from 'react';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';

export const FormBuilder = () => {
  const { form, setActiveStep } = useContext(FormContext);
  const { isAuthenticated } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isDisable = !form.title || form.components.length === 0;

  const handleSubmit = () => {
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
      <div style={{ display: 'flex', height: '90vh', flexDirection: 'column' }}>
        <Visualizer edit={true} />
        <h3 style={{ textAlign: 'center' }}>Choisissez le type de question / réponse </h3>
        <InputChoice />
        <br />
        {errorMessage.length !== 0 ? <MsgError message={errorMessage} setMessage={setErrorMessage} /> : null}
      </div>
      <br />
      <Footer handleSubmit={handleSubmit} urlComponentPrec="builder/intro" text="Voir un apercu du questionnaire" />
    </>
  );
};
