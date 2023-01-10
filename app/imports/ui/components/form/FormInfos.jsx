import { TextField } from '@mui/material';
import React from 'react';

export const FormInfos = ({ formTitle, setFormTitle, formDescription, setFormDescription }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="formTitle"
        label="Titre de votre formulaire"
        variant="outlined"
        value={formTitle}
        helperText="Entrez votre titre"
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <TextField
        id="formDescription"
        label="Description de votr formulaire"
        variant="outlined"
        value={formDescription}
        helperText="Entrez votre description"
        onChange={(e) => setFormDescription(e.target.value)}
      />
    </div>
  );
};
