import React, { createContext, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  components: [],
};

export const FormContext = createContext(initialState);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);

  return (
    <FormContext.Provider
      value={{
        form,
        setForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
