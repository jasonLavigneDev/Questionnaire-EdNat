import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { Login } from '../pages/Login';
import { Logout } from '../pages/Logout';
import { HomePage } from '../pages/HomePage';
import { FormBuilder } from '../pages/FormBuilder';

import { FormIntro } from '../pages/FormIntro';
import { FormPrevisualizer, loader } from '../pages/FormPrevisualizer';
import UserProvider from '../contexts/UserContext';
import FormProvider from '../contexts/FormContext';
import { MainLayout } from './MainLayout';

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route path="home" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="builder" element={<FormBuilder />} />
          <Route path="intro" element={<FormIntro />} />
          <Route path="previsualizer/:id" element={<FormPrevisualizer />} loader={loader} />
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
