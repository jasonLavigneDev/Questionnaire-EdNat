import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { FormContext } from '../contexts/FormContext';

export const FormIntro = () => {
  const navigate = useNavigate();
  const { currentForm } = useContext(FormContext);

  const navigateTo = () => {
    navigate(`/builder/components`);
  };

  return (
    <>
      <Breadcrumb />
      <FormInfos />
      <Footer text="Passer a l etape suivante" navigateToNextStep={navigateTo} />
    </>
  );
};
