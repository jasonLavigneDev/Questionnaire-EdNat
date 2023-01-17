import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const DateInput = ({ title, answerMode, questionId }) => {
  const [answer, setAnswer] = useState('');
  const { addAnswers } = useContext(AnswerContext);
  return (
    <div>
      <InputLabel id="dateInput-title">{title}</InputLabel>
      <TextField type="date" required onChange={(e) => setAnswer(e.target.value)} />
      {answerMode && <button onClick={() => addAnswers(questionId, answer)}>confirmer cette reponse</button>}
    </div>
  );
};

DateInput.propTypes = {
  title: PropTypes.string.isRequired,
};
