import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Link } from 'react-router-dom';
import { AppBar, Slide, useScrollTrigger } from '@mui/material';
import { HeaderMenu } from './HeaderMenu';
import LanguageSwitcher from './LanguageSwitcher';

export const Header = () => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <div className="link">
        <AppBar className="appBar flex row jc-spaceb center padl-2pct padr-2pct ht-60">
          <Link className="link txtdeco-no center" to="/">
            <img src="/images/puce_eole.png" alt="eole logo" className="wd-5 padtb-2" />
            <h1 className="h1-title-app">{i18n.__('component.header.title')}</h1>
          </Link>
          <div className="link">
            <HeaderMenu />
            <LanguageSwitcher />
          </div>
        </AppBar>
      </div>
    </Slide>
  );
};
