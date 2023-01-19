import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';

export const FormIntro = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/builder/components');
  };

  return (
    <>
      <FormInfos />
      <Button onClick={() => handleSubmit()}>Passer a l etape suivante</Button>
    </>
  );
};
