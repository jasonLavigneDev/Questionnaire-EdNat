import React from 'react';
import i18n from 'meteor/universe:i18n';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MatomoProvider } from '@datapunt/matomo-tracker-react';
import '../locales';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/App';
import { getLang } from '../../api/utils';
import store from '../../ui/redux/store';
import instance from '../../ui/utils/matomo';

/** Startup the application by rendering the router. */
Meteor.startup(() => {
  i18n.setLocale(getLang());
  document.documentElement.setAttribute('lang', getLang());
  const container = document.getElementById('react-target');

  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <MatomoProvider value={instance}>
          <App />
        </MatomoProvider>
      </Provider>
    </React.StrictMode>,
  );
});
