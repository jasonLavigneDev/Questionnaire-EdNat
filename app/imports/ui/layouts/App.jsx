import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { Login } from '../pages/Login';
import { Logout } from '../pages/Logout';
import { HomePage } from '../pages/HomePage';
import { FormBuilder } from '../pages/FormBuilder';
import FormInfos from '../components/form/FormInfos';
import { FormIntro } from '../pages/FormIntro';
import { FormPrevisualizer, loader } from '../pages/FormPrevisualizer';

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<HomePage />} errorElement={<ErrorPage />}>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="intro" element={<FormIntro />} />
        <Route path="builder" element={<FormBuilder />} />
        <Route path="previsualizer/:id" element={<FormPrevisualizer />} loader={loader} />
      </Route>,
    ),
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};
