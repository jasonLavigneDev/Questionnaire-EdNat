import React from 'react';
import i18n from 'meteor/universe:i18n';
import { createRoot } from 'react-dom/client';
import '../locales';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/App';
import { getLang } from '../../api/utils';

/** Startup the application by rendering the router. */
Meteor.startup(() => {
  i18n.setLocale(getLang());
  document.documentElement.setAttribute('lang', getLang());
  const container = document.getElementById('react-target');

  const root = createRoot(container);

  root.render(<App />);
});
