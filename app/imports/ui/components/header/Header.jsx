import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@mui/material';
import MainMenu from './MainMenu';

const appBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '2%',
  paddingRight: '2%',
  height: '6vh',
  backgroundColor: '#F9F9FD',
};

export const Header = () => {
  return (
    <AppBar sx={appBarStyle}>
      <Link to="/">
        <img src={'/images/eole-sans-fond.svg'} alt="Logo" height={45} />
      </Link>
      <MainMenu />
    </AppBar>
  );
};
