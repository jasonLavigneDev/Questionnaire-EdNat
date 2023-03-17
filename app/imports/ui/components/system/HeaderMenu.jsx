import React, { useContext, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { identicon } from 'minidenticons'; // Don't delete this import it's for default avatar
import { Button, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PackageJSON from '../../../../package.json';
import { UserContext } from '../../contexts/UserContext';

// CSS style
const sizeAvatar = {
  width: 40,
  height: 40,
};

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
        style={{ textTransform: 'none' }}
        onClick={(event) => openMenu(event)}
      >
        <Typography variant="body1" sx={{ marginRight: '1vw' }}>
          {user.username || i18n.__('api.users.labels.noUsername')}
        </Typography>
        <div>
          {user.avatar ? (
            <Avatar sx={sizeAvatar} src={user.avatar} alt={user.username} />
          ) : (
            <div style={sizeAvatar}>
              <identicon-svg style={sizeAvatar} username="default" />
            </div>
          )}
        </div>
      </Button>
      <Menu anchorEl={anchor} open={open} onClick={() => setOpen(!open)}>
        <MenuItem onClick={logout}>{i18n.__('component.headerMenu.logout')}</MenuItem>
        <Divider />
        <MenuItem disabled style={{ opacity: 0.3 }}>
          Version {version}
        </MenuItem>
      </Menu>
    </div>
  );
};
