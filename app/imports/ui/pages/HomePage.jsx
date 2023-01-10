import React, { useContext } from 'react';
import FormProvider from '../contexts/FormContext';

import { MainLayout } from '../layouts/MainLayout';

export const HomePage = () => {
  return (
    <FormProvider>
      <MainLayout>
        <div>Bienvenue sur la page d'accueil</div>
      </MainLayout>
    </FormProvider>
  );
};
