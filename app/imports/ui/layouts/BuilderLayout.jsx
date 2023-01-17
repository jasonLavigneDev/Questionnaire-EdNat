import React, { useContext, useEffect } from 'react';
import { Paper } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { Breadcrumb } from '../components/system/Breadcrumb';

export const BuilderLayout = ({ children }) => {
  return (
    <>
      <div style={{ padding: '5vh' }}>
        <Breadcrumb />
      </div>
      <Outlet />
    </>
  );
};
