import React, { useContext, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import i18n from 'meteor/universe:i18n';
import { ComponentBuilder } from '../ComponentBuilder';
import SubmitAnswerForm from './SubmitAnswerForm';
import GenerateComponent from './GenerateComponent';
import { UserContext } from '../../contexts/UserContext';
import { useSelector } from 'react-redux';
import ModalRgpd from '../system/ModalRgpd';

export const Visualizer = ({ answerMode = false }) => {
  const [componentToEdit] = useState({});
  const { user } = useContext(UserContext);
  const form = useSelector((state) => state.form);

  const ownerForm = useTracker(() => {
    if (form) {
      return Meteor.users.findOne({ _id: form.owner });
    }
    return null;
  });

  if (!form.isActive && answerMode) return <p>{i18n.__('component.visualizer.formNotActive')}</p>;
  if (!user && !form.isPublic) return <p>{i18n.__('component.visualizer.connect')}</p>;

  return (
    <div>
      {answerMode && <ModalRgpd answerMode={answerMode} />}
      {<h3 className="txtAli-center">{form.title}</h3>}
      {<h4 className="txtAli-center">{form.desc}</h4>}
      {ownerForm && (
        <h4 className="txtAli-center">
          {i18n.__('component.visualizer.createdBy')} {ownerForm.firstName} {ownerForm.lastName} ({ownerForm.username})
        </h4>
      )}
      {form.components.map((currentComponent) => (
        <div key={currentComponent.id} className="flex jc-center mt-5 mb-2">
          <GenerateComponent currentComponent={currentComponent} />
          {componentToEdit && componentToEdit.id === currentComponent.id && <ComponentBuilder />}
        </div>
      ))}
      {answerMode && <SubmitAnswerForm />}
    </div>
  );
};
