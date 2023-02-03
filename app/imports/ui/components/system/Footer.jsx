import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { BottomNavigation, Button } from '@mui/material';

import { FormContext } from '../../contexts/FormContext';

export const Footer = ({ nextStep, urlOfPrevStep, text }) => {
  const bottomBarStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 2%',
    height: '6vh',
  };

  const navigate = useNavigate();

  const { currentForm } = useContext(FormContext);

  const isDisable = !currentForm.title || currentForm.components.length === 0;
  const isTitleMissing = !currentForm.title;

  return (
    <div style={{ position: 'fixed', bottom: 30, left: 0, right: 0 }}>
      <BottomNavigation sx={bottomBarStyle} showLabels>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {urlOfPrevStep ? (
            <>
              <Button variant="contained" sx={{ marginRight: '5vw' }} onClick={() => navigate(`/${urlOfPrevStep}`)}>
                Retour
              </Button>
              <Button variant="contained" disabled={isDisable} onClick={() => nextStep()}>
                {text}
              </Button>
            </>
          ) : (
            <Button variant="contained" disabled={isTitleMissing} onClick={() => nextStep()}>
              {text}
            </Button>
          )}
        </div>
      </BottomNavigation>
    </div>
  );
};
