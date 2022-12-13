import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { homeRoute } from '/imports/ui/pages/FormBuilder';
import { previzualizerRoute } from '/imports/ui/pages/FormPrevisualizer';
import { getLang } from '../imports/api/utils';

import '../imports/startup/i18n/fr.i18n.json';

Meteor.startup(() => {
  i18n.setLocale(getLang());
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  const routes = [homeRoute, previzualizerRoute];
  const router = createBrowserRouter(routes);
  root.render(
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>,
  );
});
