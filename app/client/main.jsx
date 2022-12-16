<<<<<<< Updated upstream
import React from "react";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";
import { createRoot } from "react-dom/client";
=======
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { homeRoute } from '/imports/ui/pages/FormBuilder';
import { previzualizerRoute } from '/imports/ui/pages/FormPrevisualizer';
import { notLoggedInRoute } from '../imports/ui/pages/NotLoggedIn';
>>>>>>> Stashed changes

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);
<<<<<<< Updated upstream
  root.render(<App tab="home" />);
=======

  const [{ userId, loading }] = useAppContext();

  if (!loading && userId) routes = [homeRoute, previzualizerRoute];
  else routes = [notLoggedInRoute];

  const router = createBrowserRouter(routes);
  root.render(
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </>,
  );
>>>>>>> Stashed changes
});
