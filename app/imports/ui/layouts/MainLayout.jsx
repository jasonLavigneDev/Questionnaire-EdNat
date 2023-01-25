import React, { useContext } from 'react';
import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { GlobalStateContext } from '../contexts/GlobalStateContext';

export const MainLayout = () => {
  const globalState = useContext(GlobalStateContext);

  console.log('globalState', globalState);

  return (
    <>
      <Header />
      <main>
        <div style={{ marginTop: '8vh' }}>
          <Outlet />
        </div>
      </main>
    </>
  );
};
