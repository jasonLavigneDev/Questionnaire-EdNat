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
  const answerForms = useSelector((state) => state.answerForm);

  const navigate = useNavigate();
  const form = useSelector((state) => state.form);
  const formId = useSelector((state) => state.form.formId);

  let questionRequired = [];
  form.components.map((component) => {
    if (component.answerRequired == true) {
      questionRequired.push(component.id);
    }
  });

  const submitAnswerForm = async () => {
    let name = user ? user.username : publicName;
    await Meteor.callAsync('forms.updateAnswers', formId, {
      userId: name,
      answers: answerForms.answers,
    });
    navigate('/');
  };

  useEffect(() => {
    setAnswersAreComplete(questionRequired.length == 0);
    let questionMissing = [];
    questionRequired.map((question) => {
      answerForms.answers.map((answer) => {
        if (question === answer.questionId) {
          if (answer.answer) {
            setAnswersAreComplete(true);
          } else {
            questionMissing.push(answer.questionId);
          }
        } else {
          questionMissing.push(answer.questionId);
        }
      });
    });
  }, [answerForms, isCheckedRgpd]);

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
