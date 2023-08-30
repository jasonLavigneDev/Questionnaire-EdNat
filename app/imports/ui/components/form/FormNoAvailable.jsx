// import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FormNoAvailable = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center',
        alignItems: 'center',
        marginTop: '15vh',
      }}
    >
      <h3>{message}</h3>
      {/* <Button variant="contained" onClick={() => navigate('/')}>
        Retour à la page d'accueil
      </Button> */}
    </div>
  );
};
