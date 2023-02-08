import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../contexts/FormContext';
import { AnswerContext } from '../../contexts/AnswerContext';
import { ComponentBuilder } from '../inputs/ComponentBuilder';
import useUser from '../../hooks/useUser';
import ManageComponents from '../ManageComponents';
import SubmitAnswerForm from './SubmitAnswerForm';
import GenerateComponent from './GenerateComponent';

export const Visualizer = ({ answerMode = false, edit = false }) => {
  const [publicName, setPublicName] = useState('');
  const [componentToEdit, setComponentToEdit] = useState({});

  const { currentForm } = useContext(FormContext);
  const [user] = useUser();
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

  const editComponent = (component) => {
    setComponentToEdit(component);
  };

  useEffect(() => {
    if (userAnswers) setAnswerForm(userAnswers);
  }, []);

  if (!user && !currentForm.isPublic) return <p>Veuillez vous connecter pour répondre a ce questionnaire</p>;

  // IL SEMBLE QUE edit NE SOIS JAMAIS PASSER EN PROPS DONC EDIT === FALSE toujours

  return (
    <div>
      {<h3 style={{ textAlign: 'center' }}>{currentForm.title}</h3>}
      {<h4 style={{ textAlign: 'center' }}>{currentForm.desc}</h4>}
      {currentForm.components.map((currentComponent, index) => (
        <div key={currentComponent.id}>
          <br />
          <br />
          <GenerateComponent currentComponent={currentComponent} getAnswer={getAnswer} answerMode={answerMode} />
          {componentToEdit && componentToEdit.id === currentComponent.id && (
            <div>
              <ComponentBuilder componentToEdit={currentComponent} type={currentComponent.type} />
            </div>
          )}
          {/* {edit && (
            <div style={{ display: 'flex' }}>
              <ManageComponents currentComponent={currentComponent} index={index} editComponent={editComponent} />
            </div>
          )} */}
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
