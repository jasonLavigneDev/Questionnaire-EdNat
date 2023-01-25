import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { GlobalStateContext } from '../contexts/GlobalStateContext';

export const FormIntro = () => {
  const { form } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const isDisabled = !form.title;

  const handleSubmit = () => {
    navigate(`/builder/components/${form._id}`);
  };

  return (
    <>
      <Breadcrumb />
      <FormInfos />
      <Button disabled={isDisabled} onClick={() => handleSubmit()}>
        Passer a l etape suivante
      </Button>
    </>
  );
};
