import React from 'react';
import DynamicStore from './contexts/context.js';
import { NotLoggedIn } from './NotLoggedIn.js';

export const App = () => (
  // <DynamicStore>
  <NotLoggedIn />
  // </DynamicStore>
);
