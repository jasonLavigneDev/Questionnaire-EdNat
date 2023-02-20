import React, { useState, useContext, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';
import { MsgError } from '../components/system/MsgError';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { InputBuilder } from '../components/form/InputBuilder';
import { useSelector } from 'react-redux';

export const FormBuilder = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { setActiveStep } = useContext(FormContext);
  const form = useSelector((state) => state.form);
  const navigate = useNavigate();
  const isDisable = !form.title || form.components.length === 0;
  const haveErrorMessages = !!errorMessage.length;

  const navigateToNextStep = () => {
    if (isDisable) {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noTitleOrOptions'));
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
