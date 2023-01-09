import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/forms/methods';
import '/imports/api/users/methods';

const testMeteorSettingsUrl = (settingsUrl, withSlash = false) => {
  const url = settingsUrl;
  if (withSlash) {
    if (settingsUrl.charAt(settingsUrl.length - 1) !== '/') {
      return `${url}/`;
    }
    return url;
  }
  if (settingsUrl.charAt(settingsUrl.length - 1) === '/') {
    // delete last slash
    return url.replace(/.$/, '');
  }
  return url;
};

const accountConfig = {
  loginExpirationInDays: 90,
};

if (Meteor.settings.keycloak) {
  if (Meteor.settings.public.enableKeycloak === true) {
    accountConfig.forbidClientAccountCreation = true;
    ServiceConfiguration.configurations.upsert(
      { service: 'keycloak' },
      {
        $set: {
          loginStyle: 'redirect',
          serverUrl: testMeteorSettingsUrl(Meteor.settings.public.keycloakUrl),
          realm: Meteor.settings.public.keycloakRealm,
          clientId: Meteor.settings.keycloak.client,
          realmPublicKey: Meteor.settings.keycloak.pubkey,
          bearerOnly: false,
        },
      },
    );
  }
}
Accounts.config({
  ...accountConfig,
});

Meteor.startup(async () => {});
