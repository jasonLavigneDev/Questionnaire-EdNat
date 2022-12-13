import React from 'react';

import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

const RadioInput = ({ title, choices }) => {
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

export default RadioInput;
