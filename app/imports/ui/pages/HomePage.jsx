import React, { useContext, useEffect } from 'react';
import FormProvider from '../contexts/FormContext';
import UserProvider from '../contexts/UserContext';

import { MainLayout } from '../layouts/MainLayout';
import Header from '../components/header/Header';
import { Paper } from '@mui/material';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/builder');
  }, [user]);

  return (
    <>
      <p>Binvenue dans la nouvelle application</p>
      <button onClick={() => navigate('/login')}>Se connecter</button>
    </>
  );
};
