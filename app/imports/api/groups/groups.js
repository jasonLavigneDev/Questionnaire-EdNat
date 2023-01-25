import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { getLabel } from '../utils';

const Groups = new Mongo.Collection('groups');

// Deny all client-side updates since we will be using methods to manage this collection
Groups.deny({
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

Groups.schema = new SimpleSchema({
  name: {
    type: String,
    min: 1,
    max: 90,
    label: getLabel('api.groups.labels.name'),
  },
  slug: {
    type: String,
    min: 1,
    label: getLabel('api.groups.labels.slug'),
  },
  description: {
    type: String,
    optional: true,
    label: getLabel('api.groups.labels.description'),
  },
  content: {
    type: String,
    optional: true,
    label: getLabel('api.groups.labels.content'),
  },
  active: { type: Boolean, label: getLabel('api.groups.labels.active') },
  groupPadID: {
    type: String,
    optional: true,
    label: getLabel('api.groups.labels.groupPadID'),
  },
  digest: {
    type: String,
    optional: true,
    label: getLabel('api.groups.labels.digest'),
  },
  type: {
    type: SimpleSchema.Integer,
    allowedValues: [0, 5, 10, 15], // 0 Ouvert, 5 Modéré, 10 Fermé, 15: Automatique
    label: getLabel('api.groups.labels.type'),
  },
  avatar: {
    type: String,
    optional: true,
    label: getLabel('api.users.labels.avatar'),
    defaultValue: '',
  },
  applications: {
    type: Array,
    optional: true,
  },
  'applications.$': {
    type: String,
    label: getLabel('api.groups.labels.applications'),
  },
  owner: {
    type: String,
    label: getLabel('api.groups.labels.owner'),
  },
  admins: {
    type: Array,
    defaultValue: [],
    label: getLabel('api.groups.labels.admins'),
  },
  'admins.$': { type: String },
  animators: {
    type: Array,
    defaultValue: [],
    label: getLabel('api.groups.labels.animators'),
  },
  'animators.$': { type: String },
  members: {
    type: Array,
    defaultValue: [],
    label: getLabel('api.groups.labels.members'),
  },
  'members.$': { type: String },
  candidates: {
    type: Array,
    defaultValue: [],
    label: getLabel('api.groups.labels.candidates'),
  },
  'candidates.$': { type: String },
  numCandidates: {
    type: Number,
    defaultValue: 0,
    label: getLabel('api.groups.labels.numCandidates'),
  },
  plugins: {
    type: Object,
    defaultValue: {},
    optional: true,
    blackbox: true,
    label: getLabel('api.groups.labels.plugins'),
  },
  articles: {
    type: Boolean,
    defaultValue: false,
    label: getLabel('api.groups.labels.articles'),
  },
  meeting: {
    // server-side only, do not publish
    type: Object,
    defaultValue: {},
    label: getLabel('api.groups.labels.meetingParams'),
  },
  'meeting.attendeePW': { type: String, defaultValue: '' },
  'meeting.moderatorPW': { type: String, defaultValue: '' },
  'meeting.createTime': { type: String, defaultValue: '' },
});

Groups.typeLabels = {
  0: 'api.groups.types.open',
  5: 'api.groups.types.moderated',
  10: 'api.groups.types.private',
  15: 'api.groups.types.automatic',
};

Groups.publicFields = {
  name: 1,
  slug: 1,
  description: 1,
  active: 1,
  groupPadID: 1,
  digest: 1,
  type: 1,
  avatar: 1,
  owner: 1,
  numCandidates: 1,
  plugins: 1,
  articles: 1,
};
Groups.allPublicFields = {
  content: 1,
  applications: 1,
  ...Groups.publicFields,
};

Groups.adminFields = {
  admins: 1,
  animators: 1,
  members: 1,
  candidates: 1,
  ...Groups.allPublicFields,
};

Groups.attachSchema(Groups.schema);

export default Groups;
