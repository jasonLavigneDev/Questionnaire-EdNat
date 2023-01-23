import React from 'react';
import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/header/Header';

export const MainLayout = ({ children }) => {
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
