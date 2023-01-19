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

  console.log('FORM CONTEXTE', form);

  const resetFormContext = () => {
    setForm(initialState);
  };

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
        resetFormContext,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
