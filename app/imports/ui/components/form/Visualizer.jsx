import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/FormContext';
import { AnswerContext } from '../../contexts/AnswerContext';
import { ComponentBuilder } from '../ComponentBuilder';
import SubmitAnswerForm from './SubmitAnswerForm';
import GenerateComponent from './GenerateComponent';
import { UserContext } from '../../contexts/UserContext';

export const Visualizer = ({ answerMode = false }) => {
  const [publicName, setPublicName] = useState('');
  const [componentToEdit] = useState({});
  const { currentForm } = useContext(FormContext);

  const { user } = useContext(UserContext);

  const { setAnswerForm } = useContext(AnswerContext);
  const currentFormHasAnswers = !!currentForm.formAnswers;

  let userAnswers = null;

  if (user && currentFormHasAnswers) {
    userAnswers = currentForm.formAnswers.find((answer) => answer.userId == user.username); // answer.userID devrait etre answers.username en BDD
  }

  const getAnswer = (id) => {
    if (answerMode && userAnswers) return userAnswers.answers.find((answer) => answer.questionId == id);
    return {};
  };

  useEffect(() => {
    if (userAnswers) setAnswerForm(userAnswers);
  }, []);

  if (!user && !currentForm.isPublic) return <p>Veuillez vous connecter pour répondre a ce questionnaire</p>;

  return (
    <div>
      {<h3 style={{ textAlign: 'center' }}>{currentForm.title}</h3>}
      {<h4 style={{ textAlign: 'center' }}>{currentForm.desc}</h4>}
      {currentForm.components.map((currentComponent) => (
        <div key={currentComponent.id}>
          <br />
          <br />
          <GenerateComponent currentComponent={currentComponent} getAnswer={getAnswer} answerMode={answerMode} />
          {componentToEdit && componentToEdit.id === currentComponent.id && (
            <ComponentBuilder componentToEdit={currentComponent} type={currentComponent.type} />
          )}
          <br />
          <br />
        </div>
      ))}
      {answerMode && (
        <SubmitAnswerForm publicName={publicName} setPublicName={setPublicName} currentForm={currentForm} />
      )}
    </div>
  );
};
