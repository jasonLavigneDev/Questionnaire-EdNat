import React from 'react';
import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '../components/header/Header';
import { BreadcrumbMui } from '../components/system/breadcrums';

export const MainLayout = ({ children }) => (
  <>
    <Header />
    <main>
      <Paper sx={{ marginTop: '6vh' }}>
        <div style={{ padding: '5vh' }}>
          <BreadcrumbMui />
        </div>
        <Outlet />
        {children}
      </Paper>
    </main>
  </>
);
