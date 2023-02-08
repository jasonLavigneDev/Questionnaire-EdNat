import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserForm } from '../components/UserForm';
import useUser from '../hooks/useUser';
import { FormContext } from '../contexts/FormContext';

export const HomePage = () => {
  const [user] = useUser();
  const { allUsersForms, setAllUsersForms, resetFormContext } = useContext(FormContext);
  const formFromBDD = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    resetFormContext();
    setAllUsersForms(formFromBDD);
  }, []);

  if (!user) return <p>Veuillez vous connecter</p>;
  if (allUsersForms.length <= 0) return <p>Vous n'avez pas encore de questionnaires</p>;

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button size="large" onClick={() => navigate('/builder/intro')}>
          Nouveau questionnaire
        </Button>
      </div>
      <h2>Liste de vos questionnaires</h2>
      {allUsersForms.map((userForm) => (
        <UserForm userForm={userForm} />
      ))}
    </>
  );
};

export const loader = async () => {
  const usersForm = await Meteor.callAsync('forms.getUserForms');
  return usersForm || null;
};
