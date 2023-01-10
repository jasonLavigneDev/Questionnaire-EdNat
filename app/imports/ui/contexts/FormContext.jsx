import React, { createContext, useState } from 'react';

const initialState = {
  name: '',
  description: '',
  components: [],
};

export const FormContext = createContext(initialState);

export default function FormProvider({ children }) {
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
}
