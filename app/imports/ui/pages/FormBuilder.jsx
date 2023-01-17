import React, { useContext, useState } from 'react';

import { Button } from '@mui/material';

import { Link } from 'react-router-dom';

import { Visualizer } from '../components/form/Visualizer';
import { InputChoice } from '../components/form/InputChoice';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';
import { FormInfos } from '../components/form/FormInfos';

export const FormBuilder = () => {
  const { form, setForm } = useContext(FormContext);
  const { user, isAuthenticated } = useContext(UserContext);

  const [listOfComponentChooseByUser, setListOfComponentChooseByUser] = useState(form.components || []);
  const [idForm, setIdForm] = useState('');

  const handleSubmit = async () => {
    const result = await Meteor.callAsync('forms.createForm', {
      title: form.name,
      desc: form.description,
      owner: 'test_user',
      isModel: false,
      isPublic: false,
      groups: [],
      components: listOfComponentChooseByUser,
    });
    if (!result) {
      console.log('error');
    } else {
      setIdForm(result);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', height: '90vh', flexDirection: 'column' }}>
        <h1>User connecté : {isAuthenticated ? 'true' : 'false'}</h1>
        <h3 style={{ textAlign: 'center' }}>Presentation du formulaire créé avec vos inputs</h3>
        <Visualizer form={listOfComponentChooseByUser} setForm={setListOfComponentChooseByUser} edit={true} />
        <h3 style={{ textAlign: 'center' }}>Choix des inputs</h3>
        <InputChoice list={listOfComponentChooseByUser} setList={setListOfComponentChooseByUser} />
      </div>
      <Button onClick={() => handleSubmit()}>Enregistrer le formulaire</Button>
      <br />
      {idForm ? <Link to={`/builder/previsualizer/${idForm}`}>Voir le formulaire dernièrement créé</Link> : null}
    </>
  );
};
