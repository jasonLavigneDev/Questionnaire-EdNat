import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { Logout } from '../pages/Logout';
import { HomePage } from '../pages/HomePage';
import { FormBuilder } from '../pages/FormBuilder';

import { FormIntro } from '../pages/FormIntro';
import { FormVisualizer, loaderVisualizer } from '../pages/FormVisualizer';
import { UserProvider } from '../contexts/UserContext';
import { FormProvider } from '../contexts/FormContext';
import { MainLayout } from './MainLayout';
import { FormPrevisualizer } from '../pages/FromPrevisualizer';
import { BuilderLayout } from './BuilderLayout';
import { AnswerProvider } from '../contexts/AnswerContext';
import { AnswersPage, loaderAnswerPage } from '../pages/AnswersPage';
import { AuthProvider } from '../contexts/AuthContext';
import { loader as FormInfosLoader } from '../components/form/FormInfos';

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route path="" element={<HomePage />} />
          <Route element={<AuthProvider />}>
            <Route path="logout" element={<Logout />} />
            <Route path="builder" element={<BuilderLayout />}>
              <Route path="intro/:id?" element={<FormIntro />} loader={FormInfosLoader} />
              <Route path="components/:id?" element={<FormBuilder />} />
              <Route path="previsualizer" element={<FormPrevisualizer />} />
            </Route>
            <Route path="answers/:id" element={<AnswersPage />} loader={loaderAnswerPage} />
          </Route>
          <Route path="visualizer/:id" element={<FormVisualizer />} loader={loaderVisualizer} />
        </Route>
      </>,
    ),
  );

  return (
    <React.StrictMode>
      <UserProvider>
        <FormProvider>
          <AnswerProvider>
            <RouterProvider router={router} />
          </AnswerProvider>
        </FormProvider>
      </UserProvider>
    </React.StrictMode>
  );
};
