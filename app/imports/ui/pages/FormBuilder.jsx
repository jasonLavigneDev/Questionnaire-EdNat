import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { MsgError } from '../components/system/MsgError';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';

import { useSelector } from 'react-redux';
import { InputBuilder } from '../components/form/InputBuilder/InputBuilder';

export const FormBuilder = () => {
  const today = new Date();
  const [errorMessage, setErrorMessage] = useState('');
  const form = useSelector((state) => state.form);
  const navigate = useNavigate();
  const isDisable = !form.title || form.components.length === 0;
  const wrongExpirationDate = today > form.expirationDate;
  const haveErrorMessages = !!errorMessage.length;

  const navigateToNextStep = () => {
    if (isDisable) {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noTitleOrOptions'));
    } else if (wrongExpirationDate) {
      setErrorMessage(i18n.__('component.componentBuilder.errors.expirationDateInvalid'));
    } else {
      navigate('/builder/previsualizer');
    }
  };

  return (
    <>
      <Breadcrumb />
      <InputBuilder />
      {haveErrorMessages && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
      <br />
      <Footer nextStep={navigateToNextStep} urlOfPrevStep="builder/intro" text={i18n.__('page.formIntro.goNext')} />
    </>
  );
};
