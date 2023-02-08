import { IconButton, TextField } from '@mui/material';
import React from 'react';
import DeleteOption from './DeleteOption';
import AddIcon from '@mui/icons-material/Add';

export default function ManageOptions() {
  return (
    <>
      <br />
      <div style={{ display: 'flex' }}>
        <TextField
          id="option"
          label="Entrez un choix de réponse"
          variant="outlined"
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          sx={{ width: '85%', marginLeft: 6 }}
        />
        <IconButton onClick={() => addOption(answerText)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      {answerOptions.map((option) => (
        <DeleteOption option={option} removeOption={removeOption} />
      ))}
      <br />
    </>
  );
}
