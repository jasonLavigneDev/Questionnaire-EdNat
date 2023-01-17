import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const TextArea = ({ title, answerMode, questionId }) => {
  const [answer, setAnswer] = useState('');
  const { addAnswers } = useContext(AnswerContext);

  return (
    <div>
      <InputLabel id="textAreaInput-title">{title}</InputLabel>
      <TextField multiline rows={3} value={answer} onChange={(e) => setAnswer(e.target.value)} />
      {answerMode && <button onClick={() => addAnswers(questionId, answer)}>confirmer cette reponse</button>}
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string.isRequired,
};
