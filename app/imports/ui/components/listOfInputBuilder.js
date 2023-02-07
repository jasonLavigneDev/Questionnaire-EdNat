import React from 'react';

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
    name: 'Bouton radio (choix unique)',
    icon: <RadioButtonCheckedIcon />,
  },
  {
    id: 'checkboxInput',
    name: 'Case à cocher (choix multiple)',
    icon: <CheckBoxIcon />,
  },
  {
    id: 'selectInput',
    name: 'Liste déroulante',
    icon: <KeyboardArrowDownIcon />,
  },
  {
    id: 'numberInput',
    name: 'Nombre',
    icon: <MoneyIcon />,
  },
  {
    id: 'textInput',
    name: 'Texte court',
    icon: <ShortTextIcon />,
  },
  {
    id: 'textArea',
    name: 'Texte long',
    icon: <NotesIcon />,
  },
  {
    id: 'dateInput',
    name: 'Date',
    icon: <CalendarMonthIcon />,
  },
];
