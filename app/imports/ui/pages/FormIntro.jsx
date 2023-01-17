import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { FormContext } from '../contexts/FormContext';

export const FormIntro = () => {
  const { form, setForm } = useContext(FormContext);
  const navigate = useNavigate();

  const [globalTitle, setGlobalTitle] = useState(form.name || '');
  const [globalDesc, setGlobalDesc] = useState(form.description || '');
  const [formPublic, setFormPublic] = useState(form.public);

  const handleSubmit = () => {
    setForm({ ...form, name: globalTitle, description: globalDesc, public: formPublic });
    navigate('/builder');
  };

  return (
    <>
      <FormInfos
        formTitle={globalTitle}
        setFormTitle={setGlobalTitle}
        formDescription={globalDesc}
        setFormDescription={setGlobalDesc}
        formPublic={formPublic}
        setFormPublic={setFormPublic}
      />
      <Button onClick={() => handleSubmit()}>CLIQUE CLIQUE</Button>
    </>
  );
};
