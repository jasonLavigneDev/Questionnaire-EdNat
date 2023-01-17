import React from 'react';
import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/header/Header';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Paper sx={{ marginTop: '6vh' }}>
          <div style={{ padding: '2vh' }}></div>
          <Outlet />
        </Paper>
      </main>
    </>
  );
};
