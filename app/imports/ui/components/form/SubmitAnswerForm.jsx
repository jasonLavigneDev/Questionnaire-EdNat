import { Button, FormControlLabel, Checkbox, TextField } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { hasAlreadyRespond } from '../../utils/utils';

export default function SubmitAnswerForm() {
  const { user } = useContext(UserContext);
  const [publicName, setPublicName] = useState('');
  const [answersAreComplete, setAnswersAreComplete] = useState(false);
  const answerForm = useSelector((state) => state.answerForm);
  const userAnswers = useSelector((state) => state.answerForm.answers);

  const navigate = useNavigate();
  const form = useSelector((state) => state.form);
  const formId = useSelector((state) => state.form.formId);

  const submitAnswerForm = async () => {
    let name = user ? user.username : publicName;
    await Meteor.callAsync('forms.updateAnswers', formId, {
      userId: name,
      answers: answerForm.answers,
    });
    navigate('/');
  };

  useEffect(() => {
    const componentsWithAnswerRequired = form.components.filter((component) => component.answerRequired);
    let questionsRequired = componentsWithAnswerRequired;
    if (componentsWithAnswerRequired.length == 0) return setAnswersAreComplete(true);

    userAnswers.map((userAnswer) => {
      componentsWithAnswerRequired.map((answerRequired) => {
        if (answerRequired.id === userAnswer.questionId && userAnswer.answer.length) {
          questionsRequired = questionsRequired.filter((component) => component.id != userAnswer.questionId);
        }
      });
    });
    setAnswersAreComplete(questionsRequired.length == 0);
  }, [answerForm]);

  return (
    <div>
      {!user ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            type="text"
            name="yourName"
            id="yourName"
            value={publicName}
            placeholder={i18n.__('component.submitAnswerForm.enterName')}
            onChange={(e) => setPublicName(e.target.value)}
            sx={{ width: '50%' }}
          />
          <Button disabled={!publicName || !answersAreComplete} onClick={submitAnswerForm}>
            {i18n.__('component.submitAnswerForm.submitAnswers')}
          </Button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={submitAnswerForm} disabled={!answersAreComplete}>
              {hasAlreadyRespond(user, form)
                ? i18n.__('component.submitAnswerForm.updateAnswers')
                : i18n.__('component.submitAnswerForm.submitAnswers')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
