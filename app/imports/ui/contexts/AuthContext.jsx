import React, { createContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = () => {
  const user = useTracker(() => {
    return Meteor.user();
  });

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {isAuthenticated ? <Outlet /> : Meteor.loginWithKeycloak()}
    </AuthContext.Provider>
  );
};
