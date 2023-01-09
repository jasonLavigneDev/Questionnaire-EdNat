import React, { useState } from 'react';
import FormDescription from '../components/form/FormDescription';

export const FormIntro = () => {
  const [globalTitle, setGlobalTitle] = useState('');
  const [globalDesc, setGlobalDesc] = useState('');

  return (
    <>
      <FormDescription title={globalTitle} setTitle={setGlobalTitle} desc={globalDesc} setDesc={setGlobalDesc} />
    </>
  );
};

export const formIntroRoute = {
  path: 'intro',
  element: <FormIntro />,
};
