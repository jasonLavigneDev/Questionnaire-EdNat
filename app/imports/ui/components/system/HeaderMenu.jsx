import React, { useContext, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { identicon } from 'minidenticons'; // Don't delete this import it's for default avatar
import { Button, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PackageJSON from '../../../../package.json';
import { UserContext } from '../../contexts/UserContext';

export const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const { user } = useContext(UserContext);
  const { version } = PackageJSON;

  const navigate = useNavigate();

  const openMenu = (event) => {
    setAnchor(event.currentTarget);
    setOpen(!open);
  };

  const logout = () => {
    navigate('/logout');
    setOpen(!open);
  };

  if (!user)
    return (
      <Button variant="outlined" onClick={() => Meteor.loginWithKeycloak()}>
        {i18n.__('component.headerMenu.login')}
      </Button>
    );

  return (
    <div>
      <Button
        endIcon={<ExpandMoreIcon fontSize="large" />}
        className="txtTrans-none"
        onClick={(event) => openMenu(event)}
      >
        <Typography variant="body1" className="mr-1">
          {user.username || 'Toto'}
        </Typography>
        <div>
          {user.avatar ? (
            <Avatar className="sizeAvatar" src={user.avatar} alt={user.username} />
          ) : (
            <div className="sizeAvatar">
              <identicon-svg className="sizeAvatar" username="default" />
            </div>
          )}
        </div>
      </Button>
      <Menu anchorEl={anchor} open={open} onClick={() => setOpen(!open)}>
        <MenuItem onClick={logout}>{i18n.__('component.headerMenu.logout')}</MenuItem>
        <Divider />
        <MenuItem disabled className="opac-0p3">
          Version {version}
        </MenuItem>
      </Menu>
    </div>
  );
};
