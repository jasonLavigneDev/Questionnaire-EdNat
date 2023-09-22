import React, { createContext, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { useTracker } from 'meteor/react-meteor-data';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const isLoading = useTracker(() => {
    const userHandle = Meteor.subscribe('userData');
    return !userHandle.ready();
  });
  const user = useTracker(() => {
    return Meteor.user();
  });
  const isAuthenticated = !!user;

  useEffect(() => {
    if (user && !isLoading) {
      i18n.setLocale(user.language);
      document.documentElement.setAttribute('lang', user.language);
    }
  }, [user]);

  return <UserContext.Provider value={{ user, isLoading, isAuthenticated }}>{children}</UserContext.Provider>;
};

// Creer un hook perso.
