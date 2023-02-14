import React, { createContext, useState } from 'react';

const initialState = {
  title: '',
  desc: '',
  components: [],
  groups: [],
  isPublic: false,
};

export const FormContext = createContext(initialState);

export const FormProvider = ({ children }) => {
  const [currentForm, setCurrentForm] = useState(initialState);
  const [activeStep, setActiveStep] = useState(0); // a remplacer en se servant de l url .
  const [isOnlyForGroup, setIsOnlyForGroup] = useState(false);
  const isFormGroup = isOnlyForGroup || currentForm.groups.length > 0;
  const [acceptRgpd, setAcceptRgpd] = useState(false);

  // A mettre en local au  niveau de HomePage
  const resetFormContext = () => {
    setCurrentForm(initialState);
    setActiveStep(0);
    setAcceptRgpd(false);
  };

  console.log('currentForm Context', currentForm);

  return (
    <FormContext.Provider
      value={{
        currentForm,
        setCurrentForm,
        activeStep,
        setActiveStep,
        resetFormContext,

        isOnlyForGroup,
        setIsOnlyForGroup,
        isFormGroup,

        acceptRgpd,
        setAcceptRgpd,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
