import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { identicon } from 'minidenticons';
import PackageJSON from '../../../../package.json';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';

const MainMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useContext(GlobalStateContext);
  const navigate = useNavigate();
  const { version } = PackageJSON;

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleLogout = () => {
    navigate('/logout');
    setOpen(false);
  };

  return user && !isLoading ? (
    <div>
      <Button
        endIcon={<ExpandMoreIcon fontSize="large" />}
        style={{ textTransform: 'none' }}
        onClick={() => setOpen(true)}
      >
        <Typography variant="body1" sx={{ marginRight: '1vw' }}>
          {user.username || 'Invité'}
        </Typography>
        <div>
          {user?.avatar ? (
            <Avatar sx={sizeAvatar} src={user.avatar} alt={user.username} />
          ) : (
            <div style={sizeAvatar}>
              <identicon-svg username="default" />
            </div>
          )}
        </div>
      </Button>
      <Menu
        anchorEl={open}
        open={open}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <MenuItem onClick={handleLogout}>Se déconnecter</MenuItem>
        <Divider />
        <MenuItem disabled style={{ opacity: 0.3 }}>
          Version {version}
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <Button variant="outlined" onClick={() => Meteor.loginWithKeycloak()}>
      Se connecter
    </Button>
  );
};

// CSS style
const sizeAvatar = {
  width: 40,
  height: 40,
};

export default MainMenu;
