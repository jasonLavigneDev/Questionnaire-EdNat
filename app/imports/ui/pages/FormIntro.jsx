import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { FormContext } from '../contexts/FormContext';

export const FormIntro = () => {
  const navigate = useNavigate();

  const { form } = useContext(FormContext);

  const handleSubmit = () => {
    navigate(`/builder/components/${form._id}`);
  };

  return (
    <>
      <FormInfos />
      <Button onClick={() => handleSubmit()}>Valider ce titre et cette description</Button>
    </>
  );
};
