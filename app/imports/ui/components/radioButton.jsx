import React from 'react';
import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const MuiRadioButton = ({ title, choices }) => {
  // Doit retourner le schema ?
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <RadioGroup defaultValue="female" name="radio-buttons-group">
        {choices.map((choice) => (
          <FormControlLabel value={choice} control={<Radio />} label={choice} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MuiRadioButton;
