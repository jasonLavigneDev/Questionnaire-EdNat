import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@mui/material';

const appBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '5%',
  paddingRight: '5%',
  minHeight: 75,
  backgroundColor: '#F9F9FD',
};

export const Header = () => {
  return (
    <AppBar position="fixed" sx={appBarStyle}>
      <Link to="/">
        <img src={'/images/eole-sans-fond.svg'} alt="Logo" height={60} />
      </Link>
    </AppBar>
  );
};