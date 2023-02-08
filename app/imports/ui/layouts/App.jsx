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
import { AnswerProvider } from '../contexts/AnswerContext';
import { AuthProvider } from '../contexts/AuthContext';

import { MainLayout } from './MainLayout';

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
          <Route path="visualizer/:id" element={<AnswerPage />} loader={loaderVisualizer} />
          <Route element={<AuthProvider />}>
            <Route path="" element={<HomePage />} loader={loaderHomePage} errorElement={<ErrorPage />} />
            <Route path="logout" element={<Logout />} />
            <Route path="answers/:id" element={<ResultPage />} loader={loaderAnswerPage} />
            <Route path="builder/intro/:id?" element={<FormIntro />} loader={loaderFormIntro} />
            <Route path="builder/components/:id?" element={<FormBuilder />} />
            <Route path="builder/previsualizer" element={<FormPrevisualizer />} />
          </Route>
        </Route>
      </>,
    ),
  );

  return (
    <React.StrictMode>
      <FormProvider>
        <AnswerProvider>
          <RouterProvider router={router} />
        </AnswerProvider>
      </FormProvider>
    </React.StrictMode>
  );
};
