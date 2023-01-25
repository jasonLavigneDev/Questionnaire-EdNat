import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step, StepButton } from '@mui/material';
import { useEffect } from 'react';
import { GlobalStateContext } from '../../contexts/GlobalStateContext';

export const Breadcrumb = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { form } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const handleClick = (step) => {
    navigate(`/builder/${step}`);
  };

  useEffect(() => {
    const url = window.location.href;
    if (url.includes('intro')) {
      setActiveStep(0);
    } else if (url.includes('components')) {
      setActiveStep(1);
    } else if (url.includes('previsualizer')) {
      setActiveStep(2);
    }
  }, []);

  return (
    <div style={{ marginBottom: '10vh' }}>
      <Stepper nonLinear activeStep={activeStep}>
        <Step key="intro" completed={activeStep === 1 || activeStep === 2}>
          <StepButton color="inherit" onClick={() => handleClick('intro')}>
            Introduction
          </StepButton>
        </Step>
        <Step key="components" completed={activeStep === 2} disabled={!form.title}>
          <StepButton color="inherit" onClick={() => handleClick('components')}>
            Composant
          </StepButton>
        </Step>
        <Step key="previsualizer" disabled={form.components.length === 0}>
          <StepButton color="inherit" onClick={() => handleClick('previsualizer')}>
            Prévisualisation
          </StepButton>
        </Step>
      </Stepper>
    </div>
  );
};
