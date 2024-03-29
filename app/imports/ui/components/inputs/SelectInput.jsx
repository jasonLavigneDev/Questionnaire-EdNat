import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, Select, MenuItem, Paper, FormLabel } from '@mui/material';
import { addAnswers } from '../../redux/slices/answerFormSlice';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './InputsStyles.jsx';

export const SelectInput = ({ title, choices, questionId, answerRequired }) => {
  const inputAnswer = useSelector((state) =>
    state.answerForm.answers.find((answer) => answer.questionId === questionId),
  );
  const dispatch = useDispatch();

  const validateAnswer = (event) => {
    dispatch(addAnswers({ questionId, value: event.target.value }));
  };

  return (
    <Paper sx={styles.paperSize}>
      <FormControl sx={{ width: '30vw' }} required={answerRequired}>
        <FormLabel sx={styles.labelColor} id="selectInput-title" error={answerRequired && !inputAnswer}>
          {title}
        </FormLabel>
        <Select labelId="selectInput-title" label={title} value={inputAnswer?.answer ?? ''} onChange={validateAnswer}>
          {choices.map((choice) => (
            <MenuItem key={uuidv4()} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};
