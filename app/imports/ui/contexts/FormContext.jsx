import React, { createContext, useState } from 'react';

const initialState = {
  name: '',
  description: '',
  components: [],
  public: false,
};

export const FormContext = createContext(initialState);

export const FormProvider = ({ children }) => {
  const [form, setForm] = useState(initialState);

  console.log('FORM CONTEXTE', form);

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
