import React from 'react';
import i18n from 'meteor/universe:i18n';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { MsgError } from '../components/system/MsgError';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormObject } from '../redux/slices/formSlice';
import { checkIntegrityOfForm } from '../utils/utils';

export const FormPrevisualizer = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const form = useSelector((state) => state.form);
  const isDisable = !form.title || form.components.length === 0;
  const dispatch = useDispatch();

  const sendFormToBDD = async () => {
    if (isDisable) return setErrorMessage(i18n.__('component.componentBuilder.errors.noTitleOrOptions'));

    if (checkIntegrityOfForm(form)) {
      try {
        const result = await Meteor.callAsync('forms.createForm', {
          title: form.title,
          description: form.description,
          isModel: false,
          editableAnswers: form.editableAnswers,
          groups: form.groups,
          isPublic: form.isPublic,
          components: form.components,
        });

        if (result) {
          navigate('/');
          dispatch(resetFormObject());
        }
      } catch (error) {
        console.log('error dans sendForm', error);
      }
    } else {
      return setErrorMessage(i18n.__('component.componentBuilder.errors.invalidForm'));
    }
  };

  const updateForm = async () => {
    if (isDisable) return setErrorMessage(i18n.__('component.componentBuilder.errors.noTitleOrOptions'));

    if (checkIntegrityOfForm(form)) {
      try {
        const result = await Meteor.callAsync('forms.updateForm', {
          id: form.formId,
          title: form.title,
          description: form.description,
          isModel: false,
          editableAnswers: form.editableAnswers,
          groups: form.groups,
          isPublic: form.isPublic,
          components: form.components,
        });

        if (result) {
          navigate('/');
          dispatch(resetFormObject());
        }
      } catch (err) {
        console.log('error dans updateForm', err);
      }
    } else {
      return setErrorMessage(i18n.__('component.componentBuilder.errors.invalidForm'));
    }
  };

  if (!form) return <p>{i18n.__('page.answerPage.formNotFound')}</p>;

  return (
    <div>
      <div style={{ marginBottom: '10vh' }}>
        <Breadcrumb />
        <Visualizer />
      </div>
      {errorMessage.length !== 0 && <MsgError message={errorMessage} setMessage={setErrorMessage} />}
      <Footer
        nextStep={form.formId ? updateForm : sendFormToBDD}
        urlOfPrevStep="builder/components"
        text={form.formId ? i18n.__('page.formPrevisualizer.updateForm') : i18n.__('page.formPrevisualizer.saveForm')}
      />
    </div>
  );
};
