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

import { RadioInputBuilder } from '../inputs/Radio/RadioInputBuilder';
import { SelectInputBuilder } from '../inputs/Select/SelectInputBuilder';
import { CheckboxInputBuilder } from '../inputs/Checkbox/CheckboxInputBuilder';
import { DateInputBuilder } from '../inputs/Date/DateInputBuilder';
import { NumberInputBuilder } from '../inputs/Number/NumberInputBuilder';
import { TextInputBuilder } from '../inputs/TextInput/TextInputBuilder';
import { TextAreaInputBuilder } from '../inputs/TextArea/TextAreaInputBuilder';
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
      id: 1,
      name: 'Bouton radio (choix unique)',
      icon: <RadioButtonCheckedIcon />,
      component: <RadioInputBuilder />,
    },
    {
      id: 2,
      name: 'Case à cocher (choix multiple)',
      icon: <CheckBoxIcon />,
      component: <CheckboxInputBuilder />,
    },
    {
      id: 3,
      name: 'Liste déroulante',
      icon: <KeyboardArrowDownIcon />,
      component: <SelectInputBuilder />,
    },
    {
      id: 4,
      name: 'Nombre',
      icon: <MoneyIcon />,
      component: <NumberInputBuilder />,
    },
    {
      id: 5,
      name: 'Texte court',
      icon: <ShortTextIcon />,
      component: <TextInputBuilder />,
    },
    {
      id: 6,
      name: 'Texte long',
      icon: <NotesIcon />,
      component: <TextAreaInputBuilder />,
    },
    {
      id: 7,
      name: 'Date',
      icon: <CalendarMonthIcon />,
      component: <DateInputBuilder />,
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
            <MenuItem key={inputBuilder.id} value={inputBuilder.name}>
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
