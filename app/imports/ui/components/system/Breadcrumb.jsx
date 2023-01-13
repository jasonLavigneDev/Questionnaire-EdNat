import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, Step, StepButton } from '@mui/material';

export const Breadcrumb = () => {
  const steps = ['intro', 'builder', 'previsualizer/:id'];
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/` + steps[activeStep]);
  }, [activeStep]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={index < activeStep} disabled={index > activeStep + 1}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </>
  );
};
