import React, { useContext, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { UserContext } from '../contexts/UserContext';
import { Breadcrumb } from '../components/system/Breadcrumb';

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Paper sx={{ marginTop: '6vh' }}>
          <div style={{ padding: '5vh' }}>
            <Breadcrumb />
          </div>
          <Outlet />
        </Paper>
      </main>
    </>
  );
};
