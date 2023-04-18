import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';

// required: loads accounts customization before initial users creation

if (Meteor.settings.keycloak) {
  if (Meteor.settings.public.enableKeycloak === true) {
    if (Meteor.settings.public.laboiteURL) {
      Accounts.onCreateUser(() => {
        // Users should not be created by apps-agenda,
        // Redirect user to laboite if not found
        throw new Meteor.Error('api.users.createUser', 'User creation is disabled in Agenda');
      });
    }
    Accounts.config({
      forbidClientAccountCreation: !Meteor.isTest,
    });
    ServiceConfiguration.configurations.upsert(
      { service: 'keycloak' },
      {
        $set: {
          loginStyle: 'redirect',
          serverUrl: Meteor.settings.public.keycloakUrl,
          realm: Meteor.settings.public.keycloakRealm,
          clientId: Meteor.settings.keycloak.client,
          realmPublicKey: Meteor.settings.keycloak.pubkey,
          bearerOnly: false,
        },
      },
    );
  }
}
