import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { InputLabel, TextField } from '@mui/material';
import { AnswerContext } from '../../../contexts/AnswerContext';

export const NumberInput = ({ title, answerMode, questionId }) => {
  const [answer, setAnswer] = useState('');
  const { addAnswers } = useContext(AnswerContext);

  return (
    <div>
      <InputLabel id="numberInput-title">{title}</InputLabel>
      <TextField
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        onChange={(e) => setAnswer(e.target.value)}
      />
      {answerMode && <button onClick={() => addAnswers(questionId, answer)}>confirmer cette reponse</button>}
    </div>
  );
};

NumberInput.propTypes = {
  title: PropTypes.string.isRequired,
};
