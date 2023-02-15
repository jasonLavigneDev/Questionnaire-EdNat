import { Button, FormControlLabel, Checkbox } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
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

  let questionRequired = [];
  currentForm.components.map((component) => {
    if (component.answerRequired == true) {
      questionRequired.push(component.id);
    }
  });

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

  useEffect(() => {
    setAnswersAreComplete(questionRequired.length == 0);
    let questionMissing = [];
    questionRequired.map((question) => {
      answerForm.answers.map((answer) => {
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
  }, [answerForm, isCheckedRgpd]);

  return (
    <div>
      {!user ? (
        <div>
          <input
            type="text"
            name="yourName"
            id="yourName"
            value={publicName}
            placeholder={'entrez votre nom'}
            onChange={(e) => setPublicName(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
              control={<Checkbox checked={isCheckedRgpd} onChange={() => setIsCheckedRgpd(!isCheckedRgpd)} />}
              label="Accept RGPD"
            />
          </div>
          <Button disabled={!publicName || !isCheckedRgpd || !answersAreComplete} onClick={submitAnswerForm}>
            Soumettre ce formulaire complété
          </Button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControlLabel
              control={<Checkbox checked={isCheckedRgpd} onChange={() => setIsCheckedRgpd(!isCheckedRgpd)} />}
              label="Accept RGPD"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={submitAnswerForm} disabled={!isCheckedRgpd || !answersAreComplete}>
              {hasAlreadyRespond(user, currentForm) ? 'Mettre à jour les réponses' : 'Soumettre ce formulaire complété'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
