import React, { useContext, useState } from 'react';
import { Button, Typography, Menu, MenuItem } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { UserContext } from '../../contexts/UserContext';

const MainMenu = () => {
  const { user } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button endIcon={<ExpandMoreIcon />} style={{ textTransform: 'none' }} onClick={(event) => handleClick(event)}>
        <img src="../images/eole-sans-fond.svg" alt="user avatar" />
        <Typography variant="body1">{user?.username || 'vincent'}</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={open}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MainMenu;
