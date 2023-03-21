import React from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';

import { BottomNavigation, Button } from '@mui/material';
import { useSelector } from 'react-redux';

export const Footer = ({ nextStep, urlOfPrevStep, text }) => {
  const navigate = useNavigate();
  const form = useSelector((state) => state.form);
  const acceptRgpd = useSelector((state) => state.form.acceptRGPD);

  const isDisable = !form.title || form.components.length === 0 || (acceptRgpd === false && form.formId == null);
  const isTitleMissing = !form.title;

  return (
    <div>
      <BottomNavigation showLabels className="footer flex center ht-8vh wd-100pct">
        {urlOfPrevStep ? (
          <div className="flex">
            <Button variant="contained" className="footer-button" onClick={() => navigate(`/${urlOfPrevStep}`)}>
              {i18n.__('component.footer.goBack')}
            </Button>
            <Button variant="contained" disabled={isDisable} onClick={() => nextStep()}>
              {text}
            </Button>
          </div>
        ) : (
          <div className="flex">
            <Button className="footer-button" variant="contained" onClick={() => navigate(`/`)}>
              {i18n.__('component.footer.cancel')}
            </Button>
            <Button variant="contained" disabled={isTitleMissing} onClick={() => nextStep()}>
              {text}
            </Button>
          </div>
        )}
      </BottomNavigation>
    </div>
  );
};
