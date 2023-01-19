import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { InputChoice } from '../components/form/InputChoice';
import { UserContext } from '../contexts/UserContext';

export const FormBuilder = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div style={{ display: 'flex', height: '90vh', flexDirection: 'column' }}>
        <h1>User connecté : {isAuthenticated ? 'true' : 'false'}</h1>
        <h3 style={{ textAlign: 'center' }}>Presentation du formulaire créé avec vos inputs</h3>
        <Visualizer edit={true} />
        <h3 style={{ textAlign: 'center' }}>Choix des inputs</h3>
        <InputChoice />
      </div>
      <Button onClick={() => navigate('/builder/previsualizer')}>Prévisualiser le résultat</Button>
      <br />
    </>
  );
};
