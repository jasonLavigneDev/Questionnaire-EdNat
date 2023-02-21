import React, { useContext, useEffect, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserForm } from '../components/UserForm';
import { UserContext } from '../contexts/UserContext';
import { useDispatch } from 'react-redux';
import { resetFormObject } from '../redux/slices/formSlice';
import { FormContext } from '../contexts/FormContext';
import { resetUserAnswerObject } from '../redux/slices/answerFormSlice';
import { resetQuestionObject } from '../redux/slices/questionSlice';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const { setActiveStep, setAcceptRgpd } = useContext(FormContext);

  const [allUserForms, setAllUserForms] = useState();
  const dispatch = useDispatch();
  const formFromBDD = useLoaderData();
  const navigate = useNavigate();

  const deleteForm = async (form) => {
    await Meteor.callAsync('forms.deleteForm', { id: form._id });
    setAllUserForms(allUserForms.filter((f) => f._id !== form._id));
  };

  useEffect(() => {
    dispatch(resetFormObject());
    dispatch(resetUserAnswerObject());
    dispatch(resetQuestionObject());
    setActiveStep(0);
    setAcceptRgpd(false);
    setAllUserForms(formFromBDD);
  }, []);

  if (!user) return <p>{i18n.__('page.homePage.login')}</p>;

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button size="large" onClick={() => navigate('/builder/intro')}>
          {i18n.__('page.homePage.newForm')}
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>{i18n.__('page.homePage.formsList')}</h2>
        {allUserForms &&
          allUserForms.map((userForm) => <UserForm userForm={userForm} deleteForm={deleteForm} key={userForm._id} />)}
      </div>
    </>
  );
};

export const loader = async () => {
  const usersForm = await Meteor.callAsync('forms.getUserForms');
  return usersForm || null;
};
