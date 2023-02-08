import { IconButton, TextField } from '@mui/material';
import React from 'react';
import DeleteOption from './inputs/DeleteOption';
import AddIcon from '@mui/icons-material/Add';
import { isDuplicate } from '../utils/utils';

export default function ManageOptions({ answerText, setAnswerText, answerOptions, setAnswerOptions, setErrorMessage }) {
  const addOption = (newOption) => {
    if (newOption) {
      const opt = [...answerOptions];
      if (!isDuplicate(opt, newOption)) {
        opt.push(newOption);
        setAnswerOptions(opt);
        setAnswerText('');
      }
    } else {
      setErrorMessage(i18n.__('builders.errors.noOptions'));
    }
  };

  const removeOption = (option) => {
    const opt = answerOptions.filter((o) => option !== o);
    setAnswerOptions(opt);
  };

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
