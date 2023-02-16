import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React, { useContext } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { FormContext } from '../contexts/FormContext';

export default function FormInfoInputs({ isFormGroup }) {
  const { currentForm, setCurrentForm, isOnlyForGroup, setIsOnlyForGroup } = useContext(FormContext);

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
        label={i18n.__('component.formInfoInputs.formTitle')}
        variant="outlined"
        value={currentForm.title}
        helperText="Le titre est obligatoire"
        onChange={(e) => setCurrentForm({ ...currentForm, title: e.target.value })}
      />
      <TextField
        id="formDescription"
        label={i18n.__('component.formInfoInputs.formDesc')}
        variant="outlined"
        value={currentForm.desc}
        helperText={i18n.__('component.formInfoInputs.formDescHelp')}
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
          label={i18n.__('component.formInfoInputs.formPublic')}
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          disabled={currentForm.isPublic}
          control={
            <Checkbox
              checked={isFormGroup}
              onChange={() => handleIsOnlyForGroup()}
              name={i18n.__('component.formInfoInputs.formGroups')}
            />
          }
          label={i18n.__('component.formInfoInputs.formGroups')}
        />
      </FormGroup>
    </>
  );
}
