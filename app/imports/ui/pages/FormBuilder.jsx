import React, { useState } from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import Visualizer from '../components/form/Visualizer';
import InputChoice from '../components/form/InputChoice';
import FormDescription from '../components/form/FormDescription';

export const FormBuilder = () => {
  const [listOfComponentChooseByUser, setListOfComponentChooseByUser] = useState([]);
  const [globalTitle, setGlobalTitle] = useState('');
  const [globalDesc, setGlobalDesc] = useState('');
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <h3 style={{ textAlign: 'center' }}>Presentation du formulaire créé avec vos inputs</h3>
          <FormDescription title={globalTitle} setTitle={setGlobalTitle} desc={globalDesc} setDesc={setGlobalDesc} />
          <Visualizer form={listOfComponentChooseByUser} setForm={setListOfComponentChooseByUser} edit={true} />
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Choix des inputs</h3>
          <InputChoice list={listOfComponentChooseByUser} setList={setListOfComponentChooseByUser} />
        </div>
      </div>
      <Button onClick={() => handleSubmit()}>Enregistrer le formulaire</Button>
      <br />
      {idForm ? <Link to={`previsualizer/${idForm}`}>Voir le formulaire dernièrement créé</Link> : null}
    </div>
  );
};

export const homeRoute = {
  path: '/',
  element: <FormBuilder />,
};
