import React, { useState, useContext } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step, StepButton } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Breadcrumb = () => {
  const [activeStep, setActiveStep] = useState(0);

  const form = useSelector((state) => state.form);

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
    <div className="flex jc-center wd-100pct">
      <div className="mb-6 wd-60">
        <Stepper alternativeLabel activeStep={activeStep}>
          <Step key="intro" completed={activeStep === 1 || activeStep === 2}>
            <StepButton color="inherit" onClick={() => navigateTo('intro')}>
              {i18n.__('component.breadcrumb.intro')}
            </StepButton>
          </Step>
          <Step key="components" completed={activeStep === 2} disabled={!form.title}>
            <StepButton color="inherit" onClick={() => navigateTo('components')}>
              {i18n.__('component.breadcrumb.components')}
            </StepButton>
          </Step>
          <Step key="previsualizer" disabled={form.components.length === 0}>
            <StepButton color="inherit" onClick={() => navigateTo('previsualizer')}>
              {i18n.__('component.breadcrumb.previsualization')}
            </StepButton>
          </Step>
        </Stepper>
      </div>
    </div>
  );
};
