import React, { useState, useContext } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step, StepButton } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Breadcrumb = () => {
  const [activeStep, setActiveStep] = useState(0);

  const form = useSelector((state) => state.form);

  const isTitleInValid = !form.title || form.title.length > 96;
  const isDescriptionInValid = form.description.length > 0 && form.description.length > 256;

  const navigate = useNavigate();

  const navigateTo = (step) => {
    navigate(`/builder/${step}`);
  };
  const url = window.location.href;

  useEffect(() => {
    if (url.includes('intro')) {
      setActiveStep(0);
    } else if (url.includes('components')) {
      setActiveStep(1);
    } else if (url.includes('previsualizer')) {
      setActiveStep(2);
    }
  }, [url]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ marginBottom: '6vh', width: '60vw' }}>
        <Stepper alternativeLabel activeStep={activeStep}>
          <Step key="intro" completed={activeStep === 1 || activeStep === 2}>
            <StepButton
              disabled={isTitleInValid || isDescriptionInValid}
              color="inherit"
              onClick={() => navigateTo('intro')}
            >
              {i18n.__('component.breadcrumb.intro')}
            </StepButton>
          </Step>
          <Step key="components" completed={activeStep === 2} disabled={!form.title}>
            <StepButton
              disabled={isTitleInValid || isDescriptionInValid}
              color="inherit"
              onClick={() => navigateTo('components')}
            >
              {i18n.__('component.breadcrumb.components')}
            </StepButton>
          </Step>
          <Step key="previsualizer" disabled={form.components.length === 0}>
            <StepButton
              disabled={isTitleInValid || isDescriptionInValid}
              color="inherit"
              onClick={() => navigateTo('previsualizer')}
            >
              {i18n.__('component.breadcrumb.previsualization')}
            </StepButton>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};
