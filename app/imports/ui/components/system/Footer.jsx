import React from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';

import { BottomNavigation, Button } from '@mui/material';
import { useSelector } from 'react-redux';

export const Footer = ({ nextStep, urlOfPrevStep, text }) => {
  const bottomBarStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '8vh',
    backgroundColor: 'transparent',
  };

  const navigate = useNavigate();
  const form = useSelector((state) => state.form);
  const acceptRgpd = useSelector((state) => state.form.acceptRGPD);

  const isDisable = !form.title || form.components.length === 0 || (acceptRgpd === false && form.formId == null);
  const isTitleInValid = !form.title || form.title.length > 96;
  const isDescriptionInValid = form.description.length > 0 && form.description.length > 256;

  return (
    <div style={{ position: 'fixed', bottom: 0, left: '37vw' }}>
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
            <>
              <Button variant="contained" sx={{ marginRight: '5vw' }} onClick={() => navigate(`/`)}>
                {i18n.__('component.footer.cancel')}
              </Button>
              <Button variant="contained" disabled={isTitleInValid || isDescriptionInValid} onClick={() => nextStep()}>
                {text}
              </Button>
            </>
          )}
        </div>
      </BottomNavigation>
    </div>
  );
};
