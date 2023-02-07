import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { FormContext } from '../contexts/FormContext';

export default function FormInfoInputs() {
  const { currentForm, setCurrentForm, isOnlyForGroup, setIsOnlyForGroup } = useContext(FormContext);

  const isFormGroup = isOnlyForGroup || currentForm.groups.length > 0;

  const handleIsOnlyForGroup = () => {
    if (isOnlyForGroup === false) {
      setIsOnlyForGroup(true);
    } else {
      setIsOnlyForGroup(false);
      setCurrentForm({ ...currentForm, groups: [] });
    }
  };

  return (
    <>
      <TextField
        id="formTitle"
        label="Entrez le titre du questionnaire"
        variant="outlined"
        value={currentForm.title}
        helperText="Le titre est obligatoire"
        onChange={(e) => setCurrentForm({ ...currentForm, title: e.target.value })}
      />
      <TextField
        id="formDescription"
        label="Entrez une description de votre formulaire"
        variant="outlined"
        value={currentForm.desc}
        helperText="La description est facultative"
        onChange={(e) => setCurrentForm({ ...currentForm, desc: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          disabled={isOnlyForGroup}
          control={
            <Checkbox
              checked={currentForm.isPublic}
              onChange={() => setCurrentForm({ ...currentForm, isPublic: !currentForm.isPublic })}
              name="isPublic"
            />
          }
          label="Formulaire public"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          disabled={currentForm.isPublic}
          control={
            <Checkbox checked={isFormGroup} onChange={() => handleIsOnlyForGroup()} name="réservé aux groupes" />
          }
          label="Réservé aux groupes"
        />
      </FormGroup>
    </>
  );
}
