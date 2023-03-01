import { i18n } from 'meteor/universe:i18n';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  Divider,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDesc, addTitle, formType, toggleEditableAnswers } from '../redux/slices/formSlice';

export default function FormInfoInputs() {
  const form = useSelector((state) => state.form);
  const [radioValue, setRadioValue] = useState('private');
  const dispatch = useDispatch();

  const validateFormMode = (event) => {
    setRadioValue(event.target.name);
    dispatch(formType({ name: event.target.value }));
  };

  return (
    <>
      <TextField
        id="formTitle"
        label={i18n.__('component.formInfoInputs.formTitle')}
        variant="outlined"
        value={form.title}
        helperText={i18n.__('component.formInfoInputs.mandatoryTitle')}
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
          control={
            <Checkbox
              checked={form.editableAnswers}
              onChange={(e) => dispatch(toggleEditableAnswers())}
              name="editableAnswers"
            />
          }
          label={i18n.__('component.formInfoInputs.editableAnswers')}
        />
      </FormGroup>
      <Divider variant="middle" />
      <Typography sx={{ marginTop: '1vh' }} variant="body1">
        {i18n.__('component.formInfoInputs.formType')}
      </Typography>
      <FormControl sx={{ marginLeft: '2vw' }}>
        <RadioGroup value={radioValue} onChange={(e) => validateFormMode(e)} defaultValue="private">
          <FormControlLabel
            control={<Radio />}
            value="public"
            name="public"
            label={i18n.__('component.formInfoInputs.formPublic')}
          />
          <FormControlLabel
            control={<Radio />}
            value="private"
            name="private"
            label={i18n.__('component.formInfoInputs.formPrivate')}
          />

          <FormControlLabel
            control={<Radio />}
            value="group"
            name="group"
            label={i18n.__('component.formInfoInputs.formGroups')}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}
