import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/App';

/** Startup the application by rendering the router. */
Meteor.startup(() => {
  const container = document.getElementById('react-target');

  const root = createRoot(container);

  root.render(<App />);
});
