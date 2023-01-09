import React, { useState } from 'react';

import { Button } from '@mui/material';

import { Link } from 'react-router-dom';

import Visualizer from '../components/form/Visualizer';
import InputChoice from '../components/form/InputChoice';

export const FormBuilder = () => {
  const [listOfComponentChooseByUser, setListOfComponentChooseByUser] = useState([]);
  const [idForm, setIdForm] = useState('');

  const handleSubmit = () => {
    Meteor.call(
      'forms.createForm',
      {
        title: globalTitle,
        desc: globalDesc,
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
      {idForm ? <Link to={`previsualizer/${idForm}`}>Voir le formulaire dernièrement créé</Link> : null}
    </>
  );
};

export const formBuilderRoute = {
  path: 'builder',
  element: <FormBuilder />,
};
