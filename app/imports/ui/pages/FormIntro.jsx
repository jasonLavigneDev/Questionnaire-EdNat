import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';

export const FormIntro = () => {
  const { form, setForm } = useContext(FormContext);
  const navigate = useNavigate();

  const [globalTitle, setGlobalTitle] = useState(form.name || '');
  const [globalDesc, setGlobalDesc] = useState(form.description || '');

  const handleSubmit = () => {
    setForm({ ...form, name: globalTitle, description: globalDesc });
    navigate('/builder/components');
  };

  return (
    <>
      <FormInfos
        formTitle={globalTitle}
        setFormTitle={setGlobalTitle}
        formDescription={globalDesc}
        setFormDescription={setGlobalDesc}
      />
      <Button onClick={() => handleSubmit()}>CLIQUE CLIQUE</Button>
    </>
  );
};
