import React from 'react';
import { i18n } from 'meteor/universe:i18n';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoneyIcon from '@mui/icons-material/Money';
import ShortTextIcon from '@mui/icons-material/ShortText';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import AddCardIcon from '@mui/icons-material/AddCard';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

export const LIST_OF_INPUT_BUILDER = [
  {
    id: 'radioButtonInput',
    name: 'radioButton',
    icon: <RadioButtonCheckedIcon />,
  },
  {
    id: 'checkboxInput',
    name: 'checkbox',
    icon: <CheckBoxIcon />,
  },
  {
    id: 'selectInput',
    name: 'select',
    icon: <KeyboardArrowDownIcon />,
  },
  {
    id: 'numberInput',
    name: 'number',
    icon: <MoneyIcon />,
  },
  {
    id: 'textInput',
    name: 'text',
    icon: <ShortTextIcon />,
  },
  {
    id: 'textArea',
    name: 'textArea',
    icon: <NotesIcon />,
  },
  {
    id: 'dateInput',
    name: 'date',
    icon: <CalendarMonthIcon />,
  },
  {
    id: 'sectionStart',
    name: 'sectionStart',
    icon: <AddCardIcon />,
  },
  {
    id: 'separator',
    name: 'separator',
    icon: <HorizontalRuleIcon />,
  },
  {
    id: 'sectionEnd',
    name: 'sectionEnd',
    icon: <CreditScoreIcon />,
  },
];
