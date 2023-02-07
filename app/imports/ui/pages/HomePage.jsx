import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ListUserForm } from '../components/ListUserForm';
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

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button size="large" onClick={() => navigate('/builder/intro')}>
          Nouveau questionnaire
        </Button>
      </div>
      <ListUserForm allUsersForms={allUsersForms} />
    </>
  );
};

export const loader = async () => {
  const usersForm = await Meteor.callAsync('forms.getUserForms');
  return usersForm || null;
};
