import { Button, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const hasAlreadyRespond = (formId) => {
    const form = forms.find((form) => form._id === formId);

    if (!form.formAnswers || form.formAnswers.length === 0) {
      return false;
    } else {
      const { formAnswers } = form;
      return !!formAnswers.find((answer) => answer.userId === user.username);
    }
  };

  const hasNotAnswers = (formId) => {
    const form = forms.find((form) => form._id === formId);
    if (!form.formAnswers || form.formAnswers.length === 0) return true;
    return false;
  };

  const navigate = useNavigate();

  const { resetFormContext } = useContext(FormContext);

  useEffect(() => {
    resetFormContext();
  }, []);

  return (
    <>
      {user ? (
        <>
          <div style={{ textAlign: 'center' }}>
            <Button size="large" onClick={() => navigate('/builder/intro')}>
              Nouveau questionnaire
            </Button>
          </div>
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
                    <Button disabled={hasNotAnswers(form._id)} onClick={() => navigate(`/answers/${form._id}`)}>
                      Voir les reponses{' '}
                    </Button>
                    <Button disabled={hasAlreadyRespond(form._id)} onClick={() => navigate(`/visualizer/${form._id}`)}>
                      Repondre a ce formulaire
                    </Button>
                    <Button onClick={() => navigate(`/builder/intro/${form._id}`)}>Editer ce formulaire</Button>
                    <Divider />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </>
  );
};
