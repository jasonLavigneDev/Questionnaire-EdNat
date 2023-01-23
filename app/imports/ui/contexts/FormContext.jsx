import React, { createContext, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  components: [],
  groups: [],
  public: false,
  groupReserved: false,
};

export const FormContext = createContext(initialState);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0);

  const resetFormContext = () => {
    setForm(initialState);
    setActiveStep(0);
  };

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        activeStep,
        setActiveStep,
        resetFormContext,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
