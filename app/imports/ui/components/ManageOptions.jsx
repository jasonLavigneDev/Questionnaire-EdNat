import { IconButton, Divider, TextField } from '@mui/material';
import { i18n } from 'meteor/universe:i18n';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import { Draggable } from 'react-drag-reorder';
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
  const [localeOptions, setLocaleOptions] = useState(question.choices);

  const addOption = (newOption) => {
    if (newOption) {
      if (!isDuplicate(question.choices, newOption)) {
        dispatch(addAnswerOptions({ choices: newOption }));
        setLocaleOptions([...localeOptions, newOption]);
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

  getChangedPos = (currentPos, newPos) => {
    const optionsUpdated = [...question.choices];
    optionsUpdated.splice(newPos, 0, optionsUpdated.splice(currentPos, 1)[0]);
    dispatch(updateIndexAnswerOptions(optionsUpdated));
    setLocaleOptions(optionsUpdated);
  };

  removeOption = (choiceIndex) => {
    const optionsUpdated = [...question.choices];
    optionsUpdated.splice(choiceIndex, 1);
    dispatch(updateIndexAnswerOptions(optionsUpdated));
    setLocaleOptions(optionsUpdated);
  };

  useEffect(() => {
    console.log('localeOptions', localeOptions);
    console.log('question.choices', question.choices);
    setLocaleOptions(question.choices);
  }, [question.choices]);

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
      <div className="flex-container">
        <div className="row">
          <Draggable onPosChange={() => getChangedPos}>
            {localeOptions.map((option, index) => (
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
                    <IconButton onClick={() => removeOption(index)} sx={{ color: 'salmon' }}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <Divider variant="middle" />
              </>
            ))}
          </Draggable>
        </div>
      </div>
      <br />
    </>
  );
}
