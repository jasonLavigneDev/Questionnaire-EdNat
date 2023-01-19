import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step, StepButton } from '@mui/material';
import { FormContext } from '../../contexts/FormContext';

export const Breadcrumb = () => {
  const steps = ['builder/intro', 'builder/components', 'builder/previsualizer'];
  const { activeStep, setActiveStep } = useContext(FormContext);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${steps[activeStep]}`);
  }, [activeStep]);

  return (
    <>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={index < activeStep} disabled={index > activeStep + 1}>
            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </>
  );
};
