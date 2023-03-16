import React, { createContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = useTracker(() => {
    return Meteor.user();
  });

  const isAuthenticated = !!user;
  console.log(isAuthenticated);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {isAuthenticated ? <Outlet /> : Meteor.loginWithKeycloak()}
    </AuthContext.Provider>
  );
};
