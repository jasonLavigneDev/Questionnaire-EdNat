import { useRouteError } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import React from 'react';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>{i18n.__('page.errorPage.title')}</h1>
      <p>{i18n.__('page.errorPage.desc')}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
