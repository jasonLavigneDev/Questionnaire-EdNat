import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNavigation, useScrollTrigger, Button } from '@mui/material';

import { FormContext } from '../../contexts/FormContext';

export const Footer = ({ navigateToNextStep, urlOfPrevStep, text }) => {
  const bottomBarStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 2%',
    height: '6vh',
  };

  const navigate = useNavigate();

  const { currentForm } = useContext(FormContext);
  // const trigger = useScrollTrigger();

  const isDisable = !currentForm.title || currentForm.components.length === 0;
  const isTitleMissing = !currentForm.title;

  return (
    // <Slide direction="up" in={trigger}>
    <div style={{ position: 'fixed', bottom: 30, left: 0, right: 0 }}>
      <BottomNavigation sx={bottomBarStyle} showLabels>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {urlOfPrevStep && (
            <Button variant="contained" sx={{ marginRight: '5vw' }} onClick={() => navigate(`/${urlOfPrevStep}`)}>
              Retour
            </Button>
          )}
          <Button
            variant="contained"
            disabled={urlOfPrevStep ? isDisable : isTitleMissing}
            onClick={() => navigateToNextStep()}
          >
            {text}
          </Button>
        </div>
      </BottomNavigation>
    </div>
    // </Slide>
  );
};
