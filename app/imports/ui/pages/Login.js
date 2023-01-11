import React, { useContext, useEffect } from 'react';

import { useTracker } from 'meteor/react-meteor-data';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [state, dispatch] = useContext(UserContext);

  const navigate = useNavigate();

  const userConnected = useTracker(() => {
    return Meteor.user();
  });

  const insertUserInContext = () => {
    dispatch({
      type: 'LOGIN',
      payload: Boolean(window.localStorage.getItem('Meteor.loginToken')).toString(),
    });
  };

  useEffect(() => {
    if (userConnected) {
      insertUserInContext();
      navigate('/builder');
    }
  }, [userConnected]);

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
      <h2>User connecté : {state.isConnected}</h2>
      <button onClick={() => Meteor.loginWithKeycloak()}>login with keycloak</button>
    </>
  );
};
