import React, { useContext, useEffect } from 'react';

import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const keycloakLogout = () => {
    const { keycloakUrl, keycloakRealm } = Meteor.settings.public;
    const keycloakUrlTested = keycloakUrl;
    const keycloakLogoutUrl = `${keycloakUrlTested}/realms/${keycloakRealm}/protocol/openid-connect/logout`;
    const redirectUri = `${Meteor.absoluteUrl()}/logout`;
    window.location = `${keycloakLogoutUrl}?post_logout_redirect_uri=${redirectUri}`;
  };

  return (
    <>
      <h1>Page de login</h1>
      <h2>User connecté : {isAuthenticated ? 'true' : 'false'}</h2>
      <button onClick={() => Meteor.loginWithKeycloak()}>login with keycloak</button>
    </>
  );
};
