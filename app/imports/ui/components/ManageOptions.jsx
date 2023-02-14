import { IconButton, Divider, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { i18n } from 'meteor/universe:i18n';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { isDuplicate } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addAnswerOptions, addAnswerText, removeOption, resetAnswerText } from '../redux/slices/questionSlice';

export default function ManageOptions({ setErrorMessage }) {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);

  const addOption = (newOption) => {
    if (newOption) {
      if (!isDuplicate(question.choices, newOption)) {
        dispatch(addAnswerOptions({ choices: newOption }));
        dispatch(resetAnswerText());
      }
    } else {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
    }
  };

  return (
    <>
      <br />
      <div style={{ display: 'flex' }}>
        <TextField
          id="option"
          label={i18n.__('component.componentBuilder.inputChoice')}
          variant="outlined"
          value={question.answerText}
          onChange={(e) => dispatch(addAnswerText({ answerText: e.target.value }))}
          sx={{ width: '85%', marginLeft: 6 }}
        />
        <IconButton onClick={() => addOption(question.answerText)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      {question.choices.map((option) => (
        <>
          <div
            style={{ display: 'flex', maxWidth: '42.6vw', marginLeft: '3vw', justifyContent: 'space-between' }}
            key={uuidv4()}
          >
            <p>{option}</p>
            <IconButton onClick={() => dispatch(removeOption({ option: option }))}>
              <DeleteIcon />
            </IconButton>
          </div>
          <Divider variant="middle" />
        </>
      ))}
      <br />
    </>
  );
}
