import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { getLabel } from '../utils/functions';

Meteor.users.schema = new SimpleSchema({
  username: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.username'),
  },
  firstName: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.firstName'),
  },
  lastName: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.lastName'),
  },
  emails: {
    type: Array,
    optional: true,
    label: getLabel('api.users.labels.emails'),
  },
  'emails.$': {
    type: Object,
  },
  'emails.$.address': {
    type: String,
    label: getLabel('api.users.labels.emailAddress'),
  },
  'emails.$.verified': {
    type: Boolean,
    label: getLabel('api.users.labels.emailVerified'),
  },
  createdAt: {
    type: Date,
    label: getLabel('api.users.labels.createdAt'),
  },
  lastLogin: {
    type: Date,
    label: getLabel('api.users.labels.lastLogin'),
    optional: true,
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true,
    label: getLabel('api.users.labels.profile'),
  },
  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true,
    label: getLabel('api.users.labels.services'),
  },
  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
    label: getLabel('api.users.labels.heartbeat'),
  },
  structure: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.structure'),
  },
  primaryEmail: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.primaryEmail'),
  },
  language: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.language'),
  },
  logoutType: {
    type: String,
    optional: true,
    allowedValues: ['ask', 'local', 'global'],
    label: getLabel('api.users.labels.logoutType'),
  },
  avatar: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.avatar'),
  },
});

Meteor.users.selfFields = {
  username: 1,
  firstName: 1,
  lastName: 1,
  emails: 1,
  createdAt: 1,
  isActive: 1,
  isRequest: 1,
  favServices: 1,
  favGroups: 1,
  structure: 1,
  primaryEmail: 1,
  language: 1,
  logoutType: 1,
  lastLogin: 1,
  avatar: 1,
};

Meteor.users.publicFields = {
  username: 1,
  firstName: 1,
  lastName: 1,
  structure: 1,
  emails: 1,
  avatar: 1,
};

Meteor.users.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Meteor.users.attachSchema(Meteor.users.schema);
