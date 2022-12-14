import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FormLabel, FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';

export const RadioInput = ({ title, choices }) => {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <RadioGroup defaultValue="female" name="radio-buttons-group">
        {choices.map((choice) => (
          <div key={uuidv4()}>
            <FormControlLabel value={choice} control={<Radio />} label={choice} />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};
