import { useRouteError } from 'react-router-dom';
import React from 'react';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Une erreur est survenue !</h1>
      <p>{error.statusText}</p>
      <p>{error.data}</p>
    </div>
  );
};
