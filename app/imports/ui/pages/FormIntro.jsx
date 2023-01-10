import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormDescription from '../components/form/FormDescription';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';

export const FormIntro = () => {
  const { form, setForm } = useContext(FormContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [globalTitle, setGlobalTitle] = useState(form.name || '');
  const [globalDesc, setGlobalDesc] = useState(form.description || '');

  console.log(user);

  const handleSubmit = () => {
    setForm({ ...form, name: globalTitle, description: globalDesc });
    navigate('/builder');
  };

  return (
    <>
      <FormDescription title={globalTitle} setTitle={setGlobalTitle} desc={globalDesc} setDesc={setGlobalDesc} />
      <Button onClick={() => handleSubmit()}>CLIQUE CLIQUE</Button>
    </>
  );
};
