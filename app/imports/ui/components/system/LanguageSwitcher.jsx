import React, { useContext } from 'react';
import i18n from 'meteor/universe:i18n';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

import { UserContext } from '../../contexts/UserContext';

const LanguageSwitcher = () => {
  const { user } = useContext(UserContext);
  const allLanguages = ['fr', 'en'];
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const switchLanguage = async (lan) => {
    handleClose();
    i18n.setLocale(lan);
    document.documentElement.setAttribute('lang', lan);
    await Meteor.callAsync('users.setLanguage', { language: lan });
  };

  const flag = <img style={{ height: 40 }} alt="langue" src={`/images/i18n/fr.png`} />;

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
