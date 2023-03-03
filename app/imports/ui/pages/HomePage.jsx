import React, { useContext, useEffect, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserForm } from '../components/UserForm';
import { UserContext } from '../contexts/UserContext';
import { useDispatch } from 'react-redux';
import { resetFormObject } from '../redux/slices/formSlice';

export const HomePage = () => {
  const { user } = useContext(UserContext);

  const dispatch = useDispatch();

  const [allUserForms, setAllUserForms] = useState();
  const formFromBDD = useLoaderData();
  const navigate = useNavigate();

  const deleteForm = async (form) => {
    await Meteor.callAsync('forms.deleteForm', { id: form._id });
    setAllUserForms(allUserForms.filter((f) => f._id !== form._id));
  };

  useEffect(() => {
    setAllUserForms(formFromBDD);
    dispatch(resetFormObject());
  }, []);

  if (!user) return <p>{i18n.__('page.homePage.login')}</p>;

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '49.5vw', alignItems: 'center' }}>
          <h2>{i18n.__('page.homePage.formsList')}</h2>
          <Button variant="contained" size="large" onClick={() => navigate('/builder/intro')}>
            {i18n.__('page.homePage.newForm')}
          </Button>
        </div>
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
