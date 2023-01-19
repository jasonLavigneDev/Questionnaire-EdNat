import React from 'react';
import { Outlet } from 'react-router-dom';

import { Breadcrumb } from '../components/system/Breadcrumb';

export const BuilderLayout = () => {
  return (
    <>
      <div style={{ padding: '5vh' }}>
        <Breadcrumb />
      </div>
      <Outlet />
    </>
  );
};
