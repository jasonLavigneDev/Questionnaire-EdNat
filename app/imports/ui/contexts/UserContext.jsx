// import React, { createContext, useState } from 'react';
// import { useTracker } from 'meteor/react-meteor-data';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const isLoading = useTracker(() => {
//     userHandle = Meteor.subscribe('userData');
//     return !userHandle.ready();
//   });
//   const user = useTracker(() => {
//     return Meteor.user();
//   });
//   const isAuthenticated = !!user;

//   return <UserContext.Provider value={{ user, isLoading, isAuthenticated }}>{children}</UserContext.Provider>;
// };

// // Creer un hook perso.
