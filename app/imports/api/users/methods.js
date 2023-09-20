import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { getLabel } from '../utils/functions';

export const setLogoutType = new ValidatedMethod({
  name: 'users.setLogoutType',
  validate: new SimpleSchema({
    logoutType: { type: String, label: getLabel('api.users.labels.logoutType') },
  }).validator(),

  run({ logoutType }) {
    if (!this.userId) {
      throw new Meteor.Error('api.users.setLogoutType.notPermitted', i18n.__('api.users.mustBeLoggedIn'));
    }
    Meteor.users.update(this.userId, {
      $set: { logoutType },
    });
  },
});

export const setLanguage = new ValidatedMethod({
  name: 'users.setLanguage',
  validate: new SimpleSchema({
    language: { type: String, label: getLabel('api.users.labels.language') },
  }).validator(),

  async run({ language }) {
    if (!this.userId) {
      throw new Meteor.Error('api.users.setLanguage.notPermitted', i18n.__('api.users.mustBeLoggedIn'));
    }
    await Meteor.users.updateAsync(this.userId, {
      $set: { language },
    });
  },
});
