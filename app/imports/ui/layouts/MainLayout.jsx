import React from 'react';
import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { Breadcrumb } from '../components/system/Breadcrumb';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Paper sx={{ marginTop: '6vh' }}>
          <div style={{ padding: '5vh' }}></div>
          <Outlet />
        </Paper>
      </main>
    </>
  );
};
