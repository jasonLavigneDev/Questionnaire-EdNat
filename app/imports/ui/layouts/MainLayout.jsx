import React, { useContext, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '../components/header/Header';
import { BreadcrumbMui } from '../components/system/Breadcrums';
import { UserContext } from '../contexts/UserContext';

export const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate('/builder');
    } else {
      navigate('/home');
    }
  }, [user]);

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
