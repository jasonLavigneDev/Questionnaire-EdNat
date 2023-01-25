import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { FormContext } from '../contexts/FormContext';

export const FormIntro = () => {
  const navigate = useNavigate();
  const { form } = useContext(FormContext);

  const handleSubmit = () => {
    navigate(`/builder/components/${form._id}`);
  };

  return (
    <>
      <Breadcrumb />
      <FormInfos />
      <Footer text="Passer a l etape suivante" handleSubmit={handleSubmit} />
    </>
  );
};
