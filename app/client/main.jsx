import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { getLang } from '../imports/api/utils';

import { formBuilderRoute } from '/imports/ui/pages/FormBuilder';
import { previzualizerRoute } from '/imports/ui/pages/FormPrevisualizer';
import { formIntroRoute } from '../imports/ui/pages/FormIntro';
import { MainLayout } from '../imports/ui/layouts/MainLayout';

import '../imports/startup/i18n/fr.i18n.json';
import { loginRoute } from '/imports/ui/pages/Login';
import { logoutRoute } from '/imports/ui/pages/Logout';
import { notLoggedInRoute } from '/imports/ui/pages/NotLoggedIn';

Meteor.startup(() => {
  i18n.setLocale(getLang());
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  const routes = [
    formIntroRoute,
    formBuilderRoute,
    previzualizerRoute,
    homeRoute,
    previzualizerRoute,
    loginRoute,
    logoutRoute,
    notLoggedInRoute,
  ];
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: routes,
    },
  ]);
  root.render(
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>,
  );
});
