import CheckBox from '@mui/icons-material/CheckBox';
import { Button, FormControlLabel } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../contexts/AnswerContext';
import { UserContext } from '../../contexts/UserContext';
import { hasAlreadyRespond } from '../../utils/utils';

export default function SubmitAnswerForm({ publicName, setPublicName, currentForm }) {
  const { user } = useContext(UserContext);
  const [isCheckedRgpd, setIsCheckedRgpd] = useState(false);
  const [answersAreComplete, setAnswersAreComplete] = useState(false);
  const { answerForm, setAnswerForm } = useContext(AnswerContext);

  const navigate = useNavigate();

  const submitAnswerForm = async () => {
    const componentsUpdated = { ...answerForm };
    componentsUpdated.formId = currentForm._id;

    componentsUpdated.userId = user ? user.username : publicName;

    setAnswerForm(componentsUpdated);
    await Meteor.callAsync('forms.updateAnswers', componentsUpdated.formId, {
      userId: componentsUpdated.userId,
      answers: componentsUpdated.answers,
    });
    navigate('/');
  };

  let questionRequired = [];
  currentForm.components.map((component) => {
    if (component.answerRequired === true) {
      questionRequired.push(component.id);
    }
  });

  useEffect(() => {
    setAnswersAreComplete(false);
    let questionMissing = [];
    console.log(questionRequired);
    questionRequired.map((question) => {
      answerForm.answers.map((answer) => {
        if (question === answer.questionId) {
          if (answer.answer !== '') {
            setAnswersAreComplete(true);
          } else {
            questionMissing.push(answer.questionId);
          }
        } else {
          questionMissing.push(answer.questionId);
        }
      });
    });
  }, [answerForm]);

  const AcceptRgpd = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <FormControlLabel
          control={<CheckBox checked={isCheckedRgpd} onChange={() => setIsCheckedRgpd(!isCheckedRgpd)} />}
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
              {hasAlreadyRespond(user, currentForm)
                ? i18n.__('component.submitAnswerForm.updateAnswers')
                : i18n.__('component.submitAnswerForm.submitAnswers')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
