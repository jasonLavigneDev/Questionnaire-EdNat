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
  const [activeStep, setActiveStep] = useState(0);
  const [activeBuilder, setActiveBuilder] = useState({});
  const [allUsersForms, setAllUsersForms] = useState([]);

  const deleteForm = async (form) => {
    console.log(form);
    await Meteor.callAsync('forms.deleteForm', { id: form._id });
    setAllUsersForms(allUsersForms.filter((f) => f._id !== form._id));
  };

  const resetFormContext = () => {
    setCurrentForm(initialState);
    setActiveStep(0);
  };

  return (
    <FormContext.Provider
      value={{
        currentForm,
        setCurrentForm,
        activeStep,
        setActiveStep,
        resetFormContext,
        activeBuilder,
        setActiveBuilder,
        allUsersForms,
        setAllUsersForms,
        deleteForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
