import React, { useContext } from 'react';
import i18n from 'meteor/universe:i18n';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/UserContext';

const LanguageSwitcher = ({ topbar, relative }) => {
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

  return (
    <div>
      {topbar ? (
        <IconButton aria-controls="simple-menu" color="grey" aria-haspopup="true" onClick={handleClick} size="large">
          {flag}
        </IconButton>
      ) : (
        <Button
          variant="contained"
          aria-controls="simple-menu"
          color="grey"
          aria-haspopup="true"
          onClick={handleClick}
        ></Button>
      )}
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {allLanguages.map((lan) => (
          <MenuItem key={lan} onClick={() => switchLanguage(lan)}></MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;

LanguageSwitcher.defaultProps = {
  topbar: false, // trigger if the switcher is in the topbar or not
  relative: false, // trigger if the switcher position is absolute or relative
};

LanguageSwitcher.propTypes = {
  topbar: PropTypes.bool,
  relative: PropTypes.bool,
};
