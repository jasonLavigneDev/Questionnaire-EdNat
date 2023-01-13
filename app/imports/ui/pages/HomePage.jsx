import React, { useContext } from 'react';
import FormProvider from '../contexts/FormContext';
import UserProvider from '../contexts/UserContext';

import { MainLayout } from '../layouts/MainLayout';

export const HomePage = () => {
  return (
    <UserProvider>
      <FormProvider>
        <MainLayout>
          <div>Bienvenue sur la page d'accueil</div>
        </MainLayout>
      </FormProvider>
    </UserProvider>
  );
};
