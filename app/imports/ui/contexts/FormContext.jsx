import React, { createContext, useState } from 'react';

const initialState = {};

export const FormContext = createContext(initialState);

export const FormProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0); // a remplacer en se servant de l url .
  const [acceptRgpd, setAcceptRgpd] = useState(false);

  return (
    <FormContext.Provider
      value={{
        activeStep,
        setActiveStep,
        acceptRgpd,
        setAcceptRgpd,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
