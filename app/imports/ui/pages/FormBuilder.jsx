import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';
import { MsgError } from '../components/system/MsgError';
import { useState } from 'react';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { ListVisualizer } from '../components/form/ListVisualizer';

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
      <ListVisualizer />
      <div style={{ display: 'flex', height: '90vh', flexDirection: 'column' }}>
        {/* <Visualizer edit={true} /> */}

        {errorMessage.length !== 0 ? <MsgError message={errorMessage} setMessage={setErrorMessage} /> : null}
      </div>
      <br />
      <Footer handleSubmit={handleSubmit} urlComponentPrec="builder/intro" text="Suivant" />
    </>
  );
};
