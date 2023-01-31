import React, { useState, useEffect, useContext } from 'react';
import { FormControl, Select, InputLabel, MenuItem, OutlinedInput, Divider } from '@mui/material';

// Icon for select
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import MoneyIcon from '@mui/icons-material/Money';
import ShortTextIcon from '@mui/icons-material/ShortText';
import NotesIcon from '@mui/icons-material/Notes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { FormContext } from '../../contexts/FormContext';
import { ComponentBuilder } from '../inputs/ComponentBuilder';

export const InputChoice = () => {
  const [inputType, setInputType] = useState('');
  const { form } = useContext(FormContext);

  useEffect(() => {
    setInputType('');
  }, [form.components]);

  const listOfInputBuilder = [
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

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="selectInput-title">Type de question</InputLabel>
        <Select
          labelId="selectInput-title"
          value={inputType}
          input={<OutlinedInput label="Type de question" />}
          onChange={(event) => {
            setInputType(event.target.value);
          }}
        >
          {listOfInputBuilder.map((inputBuilder) => (
            <MenuItem key={inputBuilder.id} value={inputBuilder.id}>
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                {inputBuilder.icon}
                <Divider orientation="vertical" flexItem sx={{ margin: '0 1vw' }} />
                {inputBuilder.name}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {inputType !== '' && (
        <>
          <br />
          <div>
            <ComponentBuilder type={inputType} />
          </div>
        </>
      )}
    </div>
  );
};
