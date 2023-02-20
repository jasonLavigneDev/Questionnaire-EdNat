import React, { useContext, useEffect, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const LanguageSwitcher = () => {
  const { user } = useContext(UserContext);
  const allLanguages = ['fr', 'en'];
  const [anchorEl, setAnchorEl] = useState(null);
  const [lang, setLang] = useState(user?.language || 'fr');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && user.language && user.language !== lang) {
      setLang(user.language);
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    i18n.setLocale(lang);
    // force navigation to update page content
    navigate(location.pathname);
  }, [lang]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const switchLanguage = async (lan) => {
    handleClose();
    if (user) {
      await Meteor.callAsync('users.setLanguage', { language: lan });
    } else {
      setLang(lan);
    }
  };

  const flag = <img style={{ height: 40 }} alt="langue" src={`/images/i18n/${lang}.png`} />;

  return (
    <div>
      <IconButton onClick={handleClick}>{flag}</IconButton>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {allLanguages.map((lan) => (
          <MenuItem key={lan} onClick={() => switchLanguage(lan)}>
            {i18n.__(`i18n.${lan}`)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
