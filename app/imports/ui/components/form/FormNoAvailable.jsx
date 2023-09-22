// import { Button } from '@mui/material';
import React from 'react';

export const FormNoAvailable = ({ message }) => {
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
