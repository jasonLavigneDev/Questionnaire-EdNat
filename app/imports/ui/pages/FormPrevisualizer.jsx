import React, { useContext, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { MsgError } from '../components/system/MsgError';
import { FormContext } from '../contexts/FormContext';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { resetFormObject } from '../redux/slices/formSlice';

export const FormPrevisualizer = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { setActiveStep, setAcceptRgpd } = useContext(FormContext);
  const navigate = useNavigate();
  const form = useSelector((state) => state.form);
  const isDisable = !form.title || form.components.length === 0;
  const dispatch = useDispatch();

  const sendFormToBDD = async () => {
    if (isDisable) return setErrorMessage(i18n.__('component.componentBuilder.errors.noTitleOrOptions'));

    try {
      const result = await Meteor.callAsync('forms.createForm', {
        title: form.title,
        desc: form.desc,
        isModel: false,
        editableAnswers: form.editableAnswers,
        groups: form.groups,
        isPublic: form.isPublic,
        components: form.components,
      });

      if (result) {
        navigate('/');
        dispatch(resetFormObject());
        setActiveStep(0);
        setAcceptRgpd(false);
      }
    } catch (error) {
      console.log('error dans sendForm', error);
    }
  };

  const updateForm = async () => {
    if (isDisable) return setErrorMessage(i18n.__('component.componentBuilder.errors.noTitleOrOptions'));

    try {
      const result = await Meteor.callAsync('forms.updateForm', {
        id: form.formId,
        title: form.title,
        desc: form.desc,
        isModel: false,
        editableAnswers: form.editableAnswers,
        groups: form.groups,
        isPublic: form.isPublic,
        components: form.components,
      });

      if (result) {
        navigate('/');
        resetFormObject();
      }
    } catch (err) {
      console.log('error dans updateForm', err);
    }
  };

  useEffect(() => {
    setActiveStep(2);
  }, []);

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
