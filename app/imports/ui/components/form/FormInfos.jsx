import { TextField } from '@mui/material';
import React from 'react';

export const FormInfos = ({ formTitle, setFormTitle, formDescription, setFormDescription }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="global_title"
        label="Titre"
        variant="outlined"
        value={formTitle}
        helperText="Entrez votre titre"
        onChange={(e) => setFormTitle(e.target.value)}
      />
      <TextField
        id="global_desc"
        label="Description"
        variant="outlined"
        value={formDescription}
        helperText="Entrez votre description"
        onChange={(e) => setFormDescription(e.target.value)}
      />
    </div>
  );
};
