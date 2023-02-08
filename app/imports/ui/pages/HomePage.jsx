import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserForm } from '../components/UserForm';
import { FormContext } from '../contexts/FormContext';
import { UserContext } from '../contexts/UserContext';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const [allUserForms, setAllUserForms] = useState();
  const { resetFormContext } = useContext(FormContext);
  const formFromBDD = useLoaderData();
  const navigate = useNavigate();

  const deleteForm = async (form) => {
    await Meteor.callAsync('forms.deleteForm', { id: form._id });
    setAllUserForms(allUserForms.filter((f) => f._id !== form._id));
  };

  useEffect(() => {
    resetFormContext();
    setAllUserForms(formFromBDD);
  }, []);

  if (!user) return <p>Veuillez vous connecter</p>;

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button size="large" onClick={() => navigate('/builder/intro')}>
          Nouveau questionnaire
        </Button>
      </div>
      <h2>Liste de vos questionnaires</h2>
      {allUserForms && allUserForms.map((userForm) => <UserForm userForm={userForm} deleteForm={deleteForm} />)}
    </>
  );
};

export const loader = async () => {
  const usersForm = await Meteor.callAsync('forms.getUserForms');
  return usersForm || null;
};
