import { Button, FormControlLabel, Checkbox } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { hasAlreadyRespond } from '../../utils/utils';

export default function SubmitAnswerForm() {
  const { user } = useContext(UserContext);
  const [publicName, setPublicName] = useState('');
  const [isCheckedRgpd, setIsCheckedRgpd] = useState(false);
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

  const AcceptRgpd = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FormControlLabel
          control={<Checkbox checked={isCheckedRgpd} onChange={() => setIsCheckedRgpd(!isCheckedRgpd)} />}
          label={i18n.__('component.submitAnswerForm.acceptRgpd')}
        />
      </div>
    );
  };

  return (
    <div>
      {!user ? (
        <div>
          <input
            type="text"
            name="yourName"
            id="yourName"
            value={publicName}
            placeholder={i18n.__('component.submitAnswerForm.enterName')}
            onChange={(e) => setPublicName(e.target.value)}
          />
          <AcceptRgpd />
          <Button disabled={!publicName || !isCheckedRgpd || !answersAreComplete} onClick={submitAnswerForm}>
            {i18n.__('component.submitAnswerForm.submitAnswers')}
          </Button>
        </div>
      ) : (
        <>
          <AcceptRgpd />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={submitAnswerForm} disabled={!isCheckedRgpd || !answersAreComplete}>
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
