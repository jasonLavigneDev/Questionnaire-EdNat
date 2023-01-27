import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNavigation, Paper, useScrollTrigger, Button } from '@mui/material';

import { FormContext } from '../../contexts/FormContext';

export const Footer = ({ handleSubmit, urlComponentPrec, text }) => {
  const bottomBarStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: '6vh',
  };

  const trigger = useScrollTrigger();
  const { form } = useContext(FormContext);
  const navigate = useNavigate();

  const isDisable = !form.title || form.components.length === 0;
  const isDisabledTitle = !form.title;

  return (
    // <Slide direction="up" in={trigger}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation sx={bottomBarStyle} showLabels>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {urlComponentPrec && (
            <Button variant="contained" sx={{ marginRight: '5vw' }} onClick={() => navigate(`/${urlComponentPrec}`)}>
              Retour{' '}
            </Button>
          )}
          <Button
            variant="contained"
            disabled={urlComponentPrec ? isDisable : isDisabledTitle}
            onClick={() => handleSubmit()}
          >
            {text}
          </Button>
        </div>
      </BottomNavigation>
    </Paper>
    // </Slide>
  );
};
