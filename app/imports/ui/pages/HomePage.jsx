import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';
import { ListUserForm } from '../components/ListUserForm';
import useUser from '../components/useUser';

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
        <ListUserForm allUsersForms={allUsersForms} />
      </div>
    </>
  );
};

export const loader = async () => {
  return (await Meteor.callAsync('forms.getUserForms')) || null;
};
