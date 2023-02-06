import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import { identicon } from 'minidenticons';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PackageJSON from '../../../../package.json';
import useUser from '../useUser';

// CSS style
const sizeAvatar = {
  width: 40,
  height: 40,
};

export const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [user] = useUser();
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
        Se connecter
      </Button>
    );

  return (
    user && (
      <div>
        <Button
          endIcon={<ExpandMoreIcon fontSize="large" />}
          style={{ textTransform: 'none' }}
          onClick={(event) => openMenu(event)}
        >
          <Typography variant="body1" sx={{ marginRight: '1vw' }}>
            {user.username || 'Toto'}
          </Typography>
          <div>
            {user.avatar ? (
              <Avatar sx={sizeAvatar} src={user.avatar} alt={user.username} />
            ) : (
              <div style={sizeAvatar}>
                <identicon-svg username="default" />
              </div>
            )}
          </div>
        </Button>
        <Menu anchorEl={anchor} open={open} onClick={() => setOpen(!open)}>
          <MenuItem onClick={logout}>Se déconnecter</MenuItem>
          <Divider />
          <MenuItem disabled style={{ opacity: 0.3 }}>
            Version {version}
          </MenuItem>
        </Menu>
      </div>
    )
  );
};
