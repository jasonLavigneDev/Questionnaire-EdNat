import React from 'react';

export default function UserNotConnected() {
  return (
    <>
      <h1>AuthProvider Trigger: utilisateur non connecte</h1>
      <button onClick={() => Meteor.loginWithKeycloak()}>Veuillez vous connecter : AuthProvider</button>
    </>
  );
}
