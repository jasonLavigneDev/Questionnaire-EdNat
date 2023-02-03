import React, { createContext, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = useTracker(() => {
    return Meteor.user();
  });

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <button onClick={() => Meteor.loginWithKeycloak()}>Veuillez vous connecter : AuthProvider</button>
      )}
    </AuthContext.Provider>
  );
};
