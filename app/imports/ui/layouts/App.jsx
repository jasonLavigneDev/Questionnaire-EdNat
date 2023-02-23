import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { ErrorPage } from '../pages/ErrorPage';
import { Logout } from '../pages/Logout';
import { HomePage, loader as loaderHomePage } from '../pages/HomePage';
import { FormBuilder } from '../pages/FormBuilder';
import { FormIntro, loader as loaderFormIntro } from '../pages/FormIntro';
import { AnswerPage, loaderVisualizer } from '../pages/AnswerPage';
import { FormPrevisualizer } from '../pages/FormPrevisualizer';
import { ResultPage, loaderAnswerPage } from '../pages/ResultPage';
import { FormProvider } from '../contexts/FormContext';
import { AuthProvider } from '../contexts/AuthContext';

import { MainLayout } from './MainLayout';
import { UserProvider } from '../contexts/UserContext';

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MainLayout />}>
          <Route
            path="visualizer/:id"
            element={<AnswerPage />}
            loader={loaderVisualizer}
            errorElement={<ErrorPage />}
          />
          <Route element={<AuthProvider />}>
            <Route path="/" element={<HomePage />} loader={loaderHomePage} errorElement={<ErrorPage />} />
            <Route path="logout" element={<Logout />} errorElement={<ErrorPage />} />
            <Route path="answers/:id" element={<ResultPage />} loader={loaderAnswerPage} errorElement={<ErrorPage />} />
            <Route
              path="builder/intro/:id?"
              element={<FormIntro />}
              loader={loaderFormIntro}
              errorElement={<ErrorPage />}
            />
            <Route path="builder/components/:id?" element={<FormBuilder />} errorElement={<ErrorPage />} />
            <Route path="builder/previsualizer" element={<FormPrevisualizer />} errorElement={<ErrorPage />} />
          </Route>
        </Route>
      </>,
    ),
  );

  return (
    <UserProvider>
      <FormProvider>
        <RouterProvider router={router} />
      </FormProvider>
    </UserProvider>
  );
};
