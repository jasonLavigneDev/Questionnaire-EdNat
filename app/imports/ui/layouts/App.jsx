import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { Login } from '../pages/Login';
import { Logout } from '../pages/Logout';
import { HomePage, loaderHomePage } from '../pages/HomePage';
import { FormBuilder } from '../pages/FormBuilder';

import { FormIntro } from '../pages/FormIntro';
import { FormPrevisualizer, loaderPrevisualizer } from '../pages/FormPrevisualizer';
import { UserProvider } from '../contexts/UserContext';
import { FormProvider } from '../contexts/FormContext';
import { MainLayout } from './MainLayout';

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route path="home" element={<HomePage />} loader={loaderHomePage} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="builder/components" element={<FormBuilder />} />
          <Route path="builder/intro" element={<FormIntro />} />
          <Route path="builder/previsualizer/:id" element={<FormPrevisualizer />} loader={loaderPrevisualizer} />
        </Route>
      </>,
    ),
  );

  return (
    <React.StrictMode>
      <UserProvider>
        <FormProvider>
          <RouterProvider router={router} />
        </FormProvider>
      </UserProvider>
    </React.StrictMode>
  );
};
