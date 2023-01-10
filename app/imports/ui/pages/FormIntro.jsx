import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FormInfos } from '../components/form/FormInfos';

import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';

import { Button } from '@mui/material';

export const FormIntro = () => {
  const { form, setForm } = useContext(FormContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [globalTitle, setGlobalTitle] = useState(form.title || '');
  const [globalDesc, setGlobalDesc] = useState(form.description || '');

  console.log(user);

  const handleSubmit = () => {
    setForm({ ...form, title: globalTitle, description: globalDesc });
    navigate('/builder');
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
