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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDesc, addTitle, updateExpirationDate, formType, toggleEditableAnswers } from '../redux/slices/formSlice';
import { DatePicker } from '@mui/x-date-pickers';
import 'dayjs/locale/fr';
import { frFR } from '@mui/x-date-pickers/locales';
import { UserContext } from '../contexts/UserContext';

export default function FormInfoInputs() {
  const form = useSelector((state) => state.form);
  const { user } = useContext(UserContext);
  const isTitleInValid = !form.title || form.title.length > 96;
  const isDescriptionInValid = form.description.length > 0 && form.description.length > 256;

  const getType = () => {
    if (form) {
      if (form.isPublic) return 'public';
      else if (form.isForGroup) return 'group';
    }
    return 'private';
  };

  const [radioValue, setRadioValue] = useState(getType());
  const dispatch = useDispatch();

  const validateFormMode = (event) => {
    setRadioValue(event.target.name);
    dispatch(formType({ name: event.target.value }));
  };

  const changeExpirationDate = (value) => {
    const date = value['$d'];
    dispatch(updateExpirationDate({ expirationDate: date }));
  };

  return (
    <>
      <TextField
        id="formTitle"
        label={i18n.__('component.formInfoInputs.formTitle')}
        variant="outlined"
        value={form.title}
        helperText={
          form.title.length > 96
            ? i18n.__('component.formInfoInputs.titleTooLong')
            : i18n.__('component.formInfoInputs.mandatoryTitle')
        }
        onChange={(e) => dispatch(addTitle({ title: e.target.value }))}
        error={isTitleInValid}
      />
      <TextField
        id="formDescription"
        label={i18n.__('component.formInfoInputs.formDesc')}
        variant="outlined"
        value={form.description}
        helperText={
          isDescriptionInValid
            ? i18n.__('component.formInfoInputs.formDescTooLong')
            : i18n.__('component.formInfoInputs.formDescHelp')
        }
        onChange={(e) => dispatch(addDesc({ description: e.target.value }))}
        error={isDescriptionInValid}
        sx={{ marginTop: '1vh' }}
      />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        defaultValue={dayjs(form.expirationDate)}
        localeText={frFR.components.MuiLocalizationProvider.defaultProps.localeText}
        adapterLocale={user.language === 'fr' ? 'fr' : 'en'}
      >
        <DatePicker
          sx={{ marginTop: '1vh' }}
          label={i18n.__('component.formInfoInputs.expirationDateCalendar')}
          defaultValue={dayjs(form.expirationDate)}
          format="DD/MM/YYYY"
          onChange={(value) => changeExpirationDate(value)}
        />
        <p>
          {i18n.__('component.formInfoInputs.expirationDateInfo', {
            days: Meteor.settings.public.dataDeletionDelay || 30,
          })}
        </p>
      </LocalizationProvider>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.editableAnswers}
              onChange={() => dispatch(toggleEditableAnswers())}
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
