import { TextField } from '@mui/material';
import React from 'react';

export default function FormDescription({ title, setTitle, desc, setDesc }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="global_title"
        label="Titre"
        variant="outlined"
        value={title}
        helperText="Entrez votre titre"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="global_desc"
        label="Description"
        variant="outlined"
        value={desc}
        helperText="Entrez votre description"
        onChange={(e) => setDesc(e.target.value)}
      />
    </div>
  );
}
