import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerContext } from '../../contexts/AnswerContext';
import { UserContext } from '../../contexts/UserContext';
import { hasAlreadyRespond } from '../../utils/utils';

export default function SubmitAnswerForm({ publicName, setPublicName, currentForm }) {
  const { user } = useContext(UserContext);

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
          <Button disabled={!publicName} onClick={submitAnswerForm}>
            Soumettre ce formulaire complété
          </Button>
        </div>
      ) : (
        <Button onClick={submitAnswerForm}>
          {hasAlreadyRespond(user, currentForm) ? 'Mettre à jour les réponses' : 'Soumettre ce formulaire complété'}
        </Button>
      )}
    </div>
  );
}
