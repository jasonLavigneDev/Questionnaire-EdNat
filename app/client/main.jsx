import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/ui/App';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App tab="home" />,
    },
    {
      path: 'about',
      element: <div>About</div>,
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
