import React, { useContext, useState } from 'react';

import { Button } from '@mui/material';

import { Link } from 'react-router-dom';

import Visualizer from '../components/form/Visualizer';
import InputChoice from '../components/form/InputChoice';
import FormDescription from '../components/form/FormDescription';
import { Login } from './Login';
import { FormContext } from '../contexts/FormContext';

export const FormBuilder = () => {
  const { form, setForm } = useContext(FormContext);

  const [listOfComponentChooseByUser, setListOfComponentChooseByUser] = useState(form.components || []);
  const [idForm, setIdForm] = useState('');

  const handleSubmit = async () => {
    await Meteor.callAsync(
      'forms.createForm',
      {
        title: form.name,
        desc: form.description,
        owner: 'test_user',
        isModel: false,
        isPublic: false,
        groups: [],
        components: listOfComponentChooseByUser,
      },
      (err, res) => {
        if (err) {
          console.log(err.reason);
        } else {
          console.log(res);
          setIdForm(res);
        }
      },
    );
  };

  return (
    <>
      <div style={{ display: 'flex', height: '90vh', flexDirection: 'column' }}>
        <h3 style={{ textAlign: 'center' }}>Presentation du formulaire créé avec vos inputs</h3>
        <Visualizer form={listOfComponentChooseByUser} setForm={setListOfComponentChooseByUser} edit={true} />

        <h3 style={{ textAlign: 'center' }}>Choix des inputs</h3>
        <InputChoice list={listOfComponentChooseByUser} setList={setListOfComponentChooseByUser} />
      </div>
      <Button onClick={() => handleSubmit()}>Enregistrer le formulaire</Button>
      <br />
      {idForm ? <Link to={`/previsualizer/${idForm}`}>Voir le formulaire dernièrement créé</Link> : null}
    </>
  );
};
