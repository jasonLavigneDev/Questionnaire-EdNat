import React, { createContext, useState } from 'react';

const initialState = {};

export const UserContext = createContext(initialState);

export default function UserProvider({ children }) {
  const [user, setUser] = useState(initialState);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
