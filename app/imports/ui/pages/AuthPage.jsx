import React, { useContext, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { Button } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  const login = () => {
    navigate('/');
    Meteor.loginWithKeycloak();
  };

  return (
    <>
      <div style={{ textAlign: 'center', fontSize: '18px' }}>
        <p style={{ marginBottom: '10px' }}>{i18n.__('page.authPage.title')}</p>
        <br />
        <Button variant="contained" size="large" onClick={login}>
          {i18n.__('page.authPage.buttonText')}
        </Button>
      </div>
    </>
  );
};
