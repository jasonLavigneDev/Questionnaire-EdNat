import React, { useContext, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { UserContext } from '../contexts/UserContext';
import { Breadcrumb } from '../components/system/Breadcrumb';

export const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  /*useEffect(() => {
    if (user) {
      navigate('/builder/intro');
    } else {
      navigate('/home');
    }
  }, [user]);*/

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
