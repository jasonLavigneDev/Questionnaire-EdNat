import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/system/Header';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="mt-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};
