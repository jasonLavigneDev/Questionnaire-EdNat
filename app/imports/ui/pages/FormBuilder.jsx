import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { InputChoice } from '../components/form/InputChoice';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';

export const FormBuilder = () => {
  const { setActiveStep } = useContext(FormContext);
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStep(1);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', height: '90vh', flexDirection: 'column' }}>
        <Visualizer edit={true} />
        <h3 style={{ textAlign: 'center' }}>Choisissez le type de question / réponse </h3>
        <InputChoice />
        <br />
        <div style={{ display: 'flex' }}>
          <Button onClick={() => navigate('/builder/intro')}>Retour </Button>
          <Button onClick={() => navigate('/builder/previsualizer')}>Voir un apercu du questionnaire </Button>
        </div>
      </div>
      <br />
    </>
  );
};
