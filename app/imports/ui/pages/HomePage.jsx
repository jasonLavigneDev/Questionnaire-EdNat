import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';
import { ListUserForm } from '../components/ListUserForm';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const { setAllUsersForms, resetFormContext } = useContext(FormContext);
  const formFromBDD = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    resetFormContext();
    setAllUsersForms(formFromBDD);
  }, []);

  if (!user) return <p>Veuillez vous connecter</p>;
  if (!formFromBDD) return <p>Vous n'avez pas encore de questionnaires</p>;

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button size="large" onClick={() => navigate('/builder/intro')}>
          Nouveau questionnaire
        </Button>
      </div>
      <div>
        <h2>Liste de vos questionnaires</h2>
        {formFromBDD && <ListUserForm />}
      </div>
    </>
  );
};

export const loader = async ({ params }) => {
  return (await Meteor.callAsync('forms.getUserForms')) || null;
};
