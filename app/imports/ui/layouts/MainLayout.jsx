import React, { useContext, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { Breadcrumb } from '../components/system/Breadcrumb';

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
