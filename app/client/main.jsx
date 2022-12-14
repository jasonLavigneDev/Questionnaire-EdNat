import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';
import { FormPrevisualizer } from '/imports/ui/FormPrevisualizer';
import Forms from '../imports/api/forms/forms';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App tab="home" />,
    },
    {
      path: '/previsualizer/:_id',
      loader: async ({ request, params }) => {
        const _id = params._id;
        return { _id };
      },
      element: <FormPrevisualizer />,
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
