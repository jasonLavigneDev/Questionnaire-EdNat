import React, { useEffect, useState } from 'react';
import { IconButton, Paper, TextField, Alert, Snackbar } from '@mui/material';
import { i18n } from 'meteor/universe:i18n';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { isDuplicate } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAnswerOptions,
  addAnswerText,
  resetAnswerText,
  updateIndexAnswerOptions,
} from '../redux/slices/questionSlice';
import { ReorderIcon } from './ReorderIcon';
import { Reorder } from 'framer-motion';
export default function ManageOptions({ setErrorMessage }) {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const [openAlert, setOpenAlert] = useState(false);
  const [localQuestionChoices, setLocalQuestionsChoices] = useState(question.choices);
  const [draggable, setDraggable] = useState(false);
  useEffect(() => {
    dispatch(updateIndexAnswerOptions(localQuestionChoices));
  }, [localQuestionChoices]);

  useEffect(() => {
    setLocalQuestionsChoices(question.choices);
  }, [question]);

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

  const removeOption = (choiceIndex) => {
    const optionsUpdated = [...question.choices];
    optionsUpdated.splice(choiceIndex, 1);
    dispatch(updateIndexAnswerOptions(optionsUpdated));
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
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
        sx={{ position: 'relative', top: 0, marginLeft: '1.5vw' }}
      >
        <Alert onClose={() => setOpenAlert(false)} severity="warning" sx={{ width: '83%' }}>
          {i18n.__('component.manageOptions.duplicate')}
        </Alert>
      </Snackbar>
      <div style={{ maxWidth: '45vw', marginTop: '2vh' }}>
        <Reorder.Group
          as="div"
          values={localQuestionChoices}
          onReorder={(newReorder) => {
            setLocalQuestionsChoices(newReorder);
          }}
        >
          {localQuestionChoices.map((option, index) => (
            <Reorder.Item as="div" drag={(draggable, 'y')} key={option} value={option} style={{ cursor: 'grab' }}>
              <Paper
                sx={{
                  display: 'flex',
                  marginLeft: '3vw',
                  marginTop: '1vh',
                  justifyContent: 'space-between',
                  padding: '0 1vw',
                  '&:hover': {
                    boxShadow: '5px 5px 10px rgba(0,0,0,0.3)',
                  },
                }}
                title="Déplacer cette option"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <p
                    style={{
                      maxHeight: '1.2rem',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      marginLeft: '0.5vw',
                    }}
                  >
                    {option}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconButton onClick={() => removeOption(index)} sx={{ color: 'salmon' }}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <ReorderIcon setDraggable={setDraggable} />
                  </IconButton>
                </div>
              </Paper>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
      <br />
    </>
  );
}
