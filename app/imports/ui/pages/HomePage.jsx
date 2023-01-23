import { Button, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';

export const HomePage = () => {
  const { user } = useContext(UserContext);

  const [forms, setForms] = useState([]);

  const getForms = async () => {
    Meteor.callAsync('forms.getUserForms')
      .then((res) => {
        setForms(res);
      })
      .catch((err) => {
        console.log('forms.getUserForms', err.reason);
      });
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
      <h1 style={{ textAlign: 'center' }}>Questionnaire</h1>
      {user ? (
        <div style={{ textAlign: 'center' }}>
          <Button size="large" onClick={() => navigate('/logout')}>
            Se déconnecter
          </Button>
          <Button size="large" onClick={() => navigate('/builder/intro')}>
            Nouveau questionnaire
          </Button>
        </div>
      ) : (
        <Button onClick={() => Meteor.loginWithKeycloak()}>Se connecter</Button>
      )}
      <div>
        {user ? (
          <div>
            <h2>Liste de vos questionnaires</h2>
            <div>
              {forms.map((form) => (
                <div
                  key={form._id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flexDirection: 'column' }}>
                    <Typography variant="body1">{form.title}</Typography>
                  </div>

                  <div style={{ flexDirection: 'column' }}>
                    <Button onClick={() => navigate(`/answers/${form._id}`)}>Voir les reponses </Button>
                    <Button onClick={() => navigate(`/visualizer/${form._id}`)}>Repondre a ce formulaire</Button>
                    <Button onClick={() => navigate(`/builder/intro/${form._id}`)}>Editer ce formulaire</Button>
                    <Divider />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
