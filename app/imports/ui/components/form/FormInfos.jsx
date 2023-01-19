import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { FormContext } from '../../contexts/FormContext';

export const FormInfos = () => {
  const { form, setForm } = useContext(FormContext);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="formTitle"
        label="Titre"
        variant="outlined"
        value={form.title}
        helperText="Entrez votre titre"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <TextField
        id="formDescription"
        label="Description"
        variant="outlined"
        value={form.description}
        helperText="Entrez votre description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={form.public} onChange={() => setForm({ ...form, public: !form.public })} name="public" />
          }
          label="Formulaire public"
        />
      </FormGroup>
    </div>
  );
};
