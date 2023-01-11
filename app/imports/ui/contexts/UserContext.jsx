import React, { createContext, useReducer, useState } from 'react';
import { UserReducer } from '../reducer/UserReducer';

export const UserContext = createContext();
const initialState = { isConnected: Boolean(window.localStorage.getItem('Meteor.loginToken')).toString() };

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
}
