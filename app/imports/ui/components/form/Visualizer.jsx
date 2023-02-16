import React, { useContext, useEffect, useState } from 'react';
import i18n from 'meteor/universe:i18n';
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

  if (!currentForm.active) return <p>{i18n.__('component.visualizer.formNotActive')}</p>;
  if (!user && !currentForm.isPublic) return <p>{i18n.__('component.visualizer.connect')}</p>;

  return (
    <div>
      {<h3 style={{ textAlign: 'center' }}>{currentForm.title}</h3>}
      {<h4 style={{ textAlign: 'center' }}>{currentForm.desc}</h4>}
      {currentForm.components.map((currentComponent) => (
        <div
          key={currentComponent.id}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '5vh', marginBottom: '2vh' }}
        >
          <GenerateComponent currentComponent={currentComponent} getAnswer={getAnswer} answerMode={answerMode} />
          {componentToEdit && componentToEdit.id === currentComponent.id && (
            <ComponentBuilder componentToEdit={currentComponent} type={currentComponent.type} />
          )}
        </div>
      ))}
      {answerMode && (
        <SubmitAnswerForm publicName={publicName} setPublicName={setPublicName} currentForm={currentForm} />
      )}
    </div>
  );
};
