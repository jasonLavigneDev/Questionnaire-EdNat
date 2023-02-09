import React from 'react';
import { i18n } from 'meteor/universe:i18n';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoneyIcon from '@mui/icons-material/Money';
import ShortTextIcon from '@mui/icons-material/ShortText';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const LIST_OF_INPUT_BUILDER = [
  {
    id: 'radioButtonInput',
    name: i18n.__('component.inputs.radioButton'),
    icon: <RadioButtonCheckedIcon />,
  },
  {
    id: 'checkboxInput',
    name: i18n.__('component.inputs.checkbox'),
    icon: <CheckBoxIcon />,
  },
  {
    id: 'selectInput',
    name: i18n.__('component.inputs.select'),
    icon: <KeyboardArrowDownIcon />,
  },
  {
    id: 'numberInput',
    name: i18n.__('component.inputs.number'),
    icon: <MoneyIcon />,
  },
  {
    id: 'textInput',
    name: i18n.__('component.inputs.text'),
    icon: <ShortTextIcon />,
  },
  {
    id: 'textArea',
    name: i18n.__('component.inputs.textArea'),
    icon: <NotesIcon />,
  },
  {
    id: 'dateInput',
    name: i18n.__('component.inputs.date'),
    icon: <CalendarMonthIcon />,
  },
];
