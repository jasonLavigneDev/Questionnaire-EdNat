import { IconButton, Divider, TextField } from '@mui/material';
import { i18n } from 'meteor/universe:i18n';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import { isDuplicate } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAnswerOptions,
  addAnswerText,
  removeOption,
  resetAnswerText,
  updateIndexAnswerOptions,
} from '../redux/slices/questionSlice';

export default function ManageOptions({ setErrorMessage }) {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);

  const hasOptionBefore = (inputPos) => inputPos > 0;
  const hasOptionAfter = (inputPos) => inputPos < question.choices.length - 1;

  const swapPositionWithPreviousOption = (inputPos) => {
    if (hasOptionBefore(inputPos)) {
      const optionsUpdated = [...question.choices];
      [optionsUpdated[inputPos - 1], optionsUpdated[inputPos]] = [
        optionsUpdated[inputPos],
        optionsUpdated[inputPos - 1],
      ];
      dispatch(updateIndexAnswerOptions(optionsUpdated));
    } else {
      setErrorMessage(i18n.__('component.componentManager.errors.noQuestionBefore'));
    }
  };

  const swapPositionWithNextOption = (inputPos) => {
    if (hasOptionAfter(inputPos)) {
      const optionsUpdated = [...question.choices];
      [optionsUpdated[inputPos + 1], optionsUpdated[inputPos]] = [
        optionsUpdated[inputPos],
        optionsUpdated[inputPos + 1],
      ];
      dispatch(updateIndexAnswerOptions(optionsUpdated));
    } else {
      setErrorMessage(i18n.__('component.componentManager.errors.noQuestionAfter'));
    }
  };

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

  // Function witch catch keydown event and check if enter key is pressed
  // add Option if true and redirect focus
  const pressEnter = (event) => {
    const code = event.which || event.keyCode;
    if (code == 13) {
      addOption(question.answerText);
    }
    event.target.focus();
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
          onKeyDown={(event) => pressEnter(event)}
        />
        <IconButton onClick={() => addOption(question.answerText)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      {question.choices.map((option, index) => (
        <>
          <div
            style={{ display: 'flex', maxWidth: '42.6vw', marginLeft: '3vw', justifyContent: 'space-between' }}
            key={option.id}
          >
            <p
              style={{
                maxHeight: '1.2rem',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflowY: 'hidden',
                overflow: 'hidden',
              }}
            >
              {option}
            </p>
            <div>
              <IconButton
                disabled={!hasOptionBefore(index)}
                onClick={() => swapPositionWithPreviousOption(index, question)}
              >
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton
                disabled={!hasOptionAfter(index, question)}
                onClick={() => swapPositionWithNextOption(index, question)}
              >
                <ArrowDownwardIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(removeOption({ option: option }))} sx={{ color: 'salmon' }}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <Divider variant="middle" />
        </>
      ))}
      <br />
    </>
  );
}
