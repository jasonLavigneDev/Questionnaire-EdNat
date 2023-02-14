import { i18n } from 'meteor/universe:i18n';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDesc, addTitle, toggleIsForGroup, toggleIsPublic } from '../redux/slices/formSlice';

export default function FormInfoInputs() {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const isFormGroup = useSelector((state) => state.form.isForGroup);

  return (
    <>
      <TextField
        id="formTitle"
        label={i18n.__('component.formInfoInputs.formTitle')}
        variant="outlined"
        value={form.title}
        helperText="Le titre est obligatoire"
        onChange={(e) => dispatch(addTitle({ title: e.target.value }))}
      />
      <TextField
        id="formDescription"
        label={i18n.__('component.formInfoInputs.formDesc')}
        variant="outlined"
        value={form.desc}
        helperText={i18n.__('component.formInfoInputs.formDescHelp')}
        onChange={(e) => dispatch(addDesc({ desc: e.target.value }))}
      />
      <FormGroup>
        <FormControlLabel
          disabled={form.isForGroup}
          control={<Checkbox checked={form.isPublic} onChange={(e) => dispatch(toggleIsPublic())} name="isPublic" />}
          label="Formulaire public"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          disabled={form.isPublic}
          control={
            <Checkbox
              checked={isFormGroup}
              onChange={() => dispatch(toggleIsForGroup())}
              name={i18n.__('component.formInfoInputs.formGroups')}
            />
          }
          label={i18n.__('component.formInfoInputs.formGroups')}
        />
      </FormGroup>
    </>
  );
}
