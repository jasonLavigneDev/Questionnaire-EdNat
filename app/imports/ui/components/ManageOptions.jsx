import React, { useCallback, useState } from 'react';
import { IconButton, Divider, Paper, TextField, Alert, Snackbar } from '@mui/material';
import { i18n } from 'meteor/universe:i18n';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
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
  const [openAlert, setOpenAlert] = useState(false);

  const addOption = (newOption) => {
    if (!newOption) {
      setErrorMessage(i18n.__('component.componentBuilder.errors.noOptions'));
      return;
    }

    if (isDuplicate(question.choices, newOption)) {
      setOpenAlert(true);
      return;
    }

    dispatch(addAnswerOptions({ choices: newOption }));
    dispatch(resetAnswerText());
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
  };

  removeOption = (choiceIndex) => {
    const optionsUpdated = [...question.choices];
    optionsUpdated.splice(choiceIndex, 1);
    dispatch(updateIndexAnswerOptions(optionsUpdated));
  };

  const DraggableRender = useCallback(() => {
    return (
      <Draggable onPosChange={this.getChangedPos}>
        {question.choices.map((option, index) => (
          <>
            <Paper
              className="flex ml-3 mt-1 jc-spaceb padlr-1"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgb(180, 180, 180)',
                },
              }}
              key={option.id}
              title="Déplacer cette option"
            >
              <div className="flex ali-center">
                <DragIndicatorIcon sx={{ color: 'rgb(180, 180, 180)', marginLeft: -2 }} />
                <p className="maxHt-1p2rem overflow-ellipsis ml-0p5">{option}</p>
              </div>
              <div className="flex center">
                <IconButton onClick={() => removeOption(index)} className="color-salmon">
                  <DeleteIcon />
                </IconButton>
              </div>
            </Paper>
          </>
        ))}
      </Draggable>
    );
  }, [question.choices]);

  return (
    <>
      <br />
      <div className="flex">
        <TextField
          id="option"
          label={i18n.__('component.componentBuilder.inputChoice')}
          variant="outlined"
          value={question.answerText}
          onChange={(e) => dispatch(addAnswerText({ answerText: e.target.value }))}
          className="ml-6 wd-85pct"
          onKeyDown={(event) => pressEnter(event)}
        />
        <IconButton onClick={() => addOption(question.answerText)}>
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
        className="pos-relative top-0 ml-1p5"
      >
        <Alert onClose={() => setOpenAlert(false)} severity="warning" className="wd-83pct">
          {i18n.__('component.manageOptions.duplicate')}
        </Alert>
      </Snackbar>
      <div className="maxWd-45 mt-2">
        <DraggableRender />
      </div>

      <br />
    </>
  );
}
