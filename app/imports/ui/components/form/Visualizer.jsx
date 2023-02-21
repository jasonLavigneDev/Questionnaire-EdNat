import React, { useContext, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { ComponentBuilder } from '../ComponentBuilder';
import SubmitAnswerForm from './SubmitAnswerForm';
import GenerateComponent from './GenerateComponent';
import { UserContext } from '../../contexts/UserContext';
import { useSelector } from 'react-redux';

export const Visualizer = ({ answerMode = false }) => {
  const [componentToEdit] = useState({});
  const { user } = useContext(UserContext);
  const form = useSelector((state) => state.form);

  if (!form.isActive && answerMode) return <p>{i18n.__('component.visualizer.formNotActive')}</p>;
  if (!user && !form.isPublic) return <p>{i18n.__('component.visualizer.connect')}</p>;

  return (
    <div>
      {<h3 style={{ textAlign: 'center' }}>{form.title}</h3>}
      {<h4 style={{ textAlign: 'center' }}>{form.desc}</h4>}
      {form.components.map((currentComponent) => (
        <div
          key={currentComponent.id}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '5vh', marginBottom: '2vh' }}
        >
          <GenerateComponent currentComponent={currentComponent} />
          {componentToEdit && componentToEdit.id === currentComponent.id && <ComponentBuilder />}
        </div>
      ))}
      {answerMode && <SubmitAnswerForm />}
    </div>
  );
};
