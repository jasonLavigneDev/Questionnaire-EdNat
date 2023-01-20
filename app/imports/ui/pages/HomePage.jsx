import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';

export const HomePage = () => {
  const { user } = useContext(UserContext);

  const [forms, setForms] = useState([]);

  const getForms = async () => {
    const temp = await Meteor.callAsync('forms.getUserForms', { userId: user._id });
    setForms(temp);
  };
  useEffect(() => {
    if (user) {
      getForms();
    }
  }, [user]);

  const navigate = useNavigate();

  const { resetFormContext } = useContext(FormContext);

  useEffect(() => {
    resetFormContext();
  }, []);

  return (
    <>
      <p>Bienvenue dans la nouvelle application</p>
      {user ? (
        <div>
          <Button onClick={() => navigate('/logout')}>Logout</Button>
          <Button onClick={() => navigate('/builder')}>Builder</Button>
        </div>
      ) : (
        <Button onClick={() => Meteor.loginWithKeycloak()}>Login</Button>
      )}
      <div>
        {user ? (
          <div>
            <h2>Liste des formulaires</h2>
            <div>
              {forms.map((form) => (
                <div key={form._id}>
                  <p>{form.title}</p>
                  <button onClick={() => navigate(`/visualizer/${form._id}`)}>Repondre a ce formulaire</button>
                  <button onClick={() => navigate(`/answers/${form._id}`)}>Voir les reponses </button>
                  <br />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
