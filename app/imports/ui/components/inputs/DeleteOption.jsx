import { Divider, IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

export default function DeleteOption({ option, removeOption }) {
  return (
    <>
      <div
        style={{ display: 'flex', maxWidth: '42.6vw', marginLeft: '3vw', justifyContent: 'space-between' }}
        key={uuidv4()}
      >
        <p>{option}</p>
        <IconButton onClick={() => removeOption(option)}>
          <DeleteIcon />
        </IconButton>
      </div>
      <Divider variant="middle" />
    </>
  );
}
