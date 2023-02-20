import React, { useContext } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';

import { BottomNavigation, Button } from '@mui/material';
import { FormContext } from '../../contexts/FormContext';
import { useSelector } from 'react-redux';

export const Footer = ({ nextStep, urlOfPrevStep, text }) => {
  const bottomBarStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '8vh',
  };

  const navigate = useNavigate();

  const { activeStep, acceptRgpd } = useContext(FormContext);
  const form = useSelector((state) => state.form);

  const isDisable = !form.title || form.components.length === 0 || (activeStep === 2 && acceptRgpd === false);
  const isTitleMissing = !form.title;

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <BottomNavigation sx={bottomBarStyle} showLabels>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {urlOfPrevStep ? (
            <>
              <Button variant="contained" sx={{ marginRight: '5vw' }} onClick={() => navigate(`/${urlOfPrevStep}`)}>
                {i18n.__('component.footer.goBack')}
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
