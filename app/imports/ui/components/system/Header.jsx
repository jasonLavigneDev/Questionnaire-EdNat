import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { AppBar, Slide, useScrollTrigger } from '@mui/material';
import { HeaderMenu } from './HeaderMenu';
import LanguageSwitcher from './LanguageSwitcher';

const appBarStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: '2%',
  paddingRight: '2%',
  height: '60px',
  backgroundColor: '#F9F9FD',
};

export const Header = () => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar sx={appBarStyle}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
          <img
            src="/images/puce_eole.png"
            alt="eole logo"
            style={{ height: 30, marginTop: '2.5vh', paddingRight: '1vh' }}
          />
          <h1 style={{ fontFamily: 'OdinRounded', color: '#372f84' }}>{i18n.__('component.header.title')}</h1>
        </Link>
        <div style={{ display: 'flex' }}>
          <HeaderMenu />
          <LanguageSwitcher />
        </div>
      </AppBar>
    </Slide>
  );
};
