import React, { createContext, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const user = useTracker(() => {
    return Meteor.user();
  });
  const isAuthenticated = !!user;

  console.log('user dans contexte', user);
  console.log('isAuthenticated dans contexte ', isAuthenticated);

  return <UserContext.Provider value={{ user, isAuthenticated }}>{children}</UserContext.Provider>;
}
