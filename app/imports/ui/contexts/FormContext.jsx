import React, { createContext, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  components: [],
  public: false,
};

export const FormContext = createContext(initialState);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0);

  console.log('FORM CONTEXTE', form);

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
