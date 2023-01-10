import React, { useContext } from 'react';

import { useTracker } from 'meteor/react-meteor-data';
import { UserContext } from '../contexts/UserContext';

export const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const userConnected = useTracker(() => {
    setUser(Meteor.user());
    return Meteor.user();
  });

  const onLogout = () => {
    keycloakLogout();
  };

  console.log(user);

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
      {!userConnected ? (
        <button onClick={() => Meteor.loginWithKeycloak()}>login with keycloak</button>
      ) : (
        <button onClick={() => onLogout()}>Logout</button>
      )}
    </>
  );
};
