import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';
import { MsgError } from '../components/system/MsgError';
import { useState } from 'react';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { ListVisualizer } from '../components/form/ListVisualizer';

export const FormBuilder = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const { currentForm, setActiveStep } = useContext(FormContext);

  const navigate = useNavigate();

  const isDisable = !currentForm.title || currentForm.components.length === 0;

  const navigateTo = () => {
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
      <ListVisualizer />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <Visualizer edit={true} /> */}
        {!!errorMessage.length && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
      </div>
      <br />
      <Footer navigateToNextStep={navigateTo} urlOfPrevStep="builder/intro" text="Suivant" />
    </>
  );
};
