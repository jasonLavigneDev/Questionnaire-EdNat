import React, { createContext, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const user = useTracker(() => {
    return Meteor.user();
  });
  const isAuthenticated = !!user;

  return <UserContext.Provider value={{ user, isAuthenticated }}>{children}</UserContext.Provider>;
};
