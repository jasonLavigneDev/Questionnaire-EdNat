import React, { createContext } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet } from 'react-router-dom';
import UserNotConnected from '../components/UserNotConnected';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = useTracker(() => {
    return Meteor.user();
  });

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {isAuthenticated ? <Outlet /> : <UserNotConnected />}
    </AuthContext.Provider>
  );
};
