import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { getLabel } from '../utils';

const Forms = new Mongo.Collection('forms');

// Deny all client-side updates since we will be using methods to manage this collection
Forms.deny({
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

export const Component = new SimpleSchema({
  type: {
    type: String,
    label: getLabel('api.forms.labels.component.type'),
  },
  title: {
    type: String,
    label: getLabel('api.forms.labels.component.title'),
  },
  choices: {
    type: Array,
    label: getLabel('api.forms.labels.component.choices'),
    optional: true,
  },
  'choices.$': { type: String },
});

Forms.schema = new SimpleSchema(
  {
    title: {
      type: String,
      min: 1,
      max: 96,
      label: getLabel('api.forms.labels.title'),
    },
    desc: {
      type: String,
      min: 1,
      max: 256,
      label: getLabel('api.forms.labels.desc'),
    },
    isModel: {
      type: Boolean,
      label: getLabel('api.forms.labels.isModel'),
    },
    createdAt: {
      type: Date,
      label: getLabel('api.forms.labels.createdAt'),
      optional: true,
      autoValue() {
        if ((this.isInsert && this.field('draft').value === false) || (!this.isInsert && !this.value)) {
          return new Date();
        }
        return this.value;
      },
    },
    owner: {
      type: String,
      label: getLabel('api.forms.labels.owner'),
    },
    isPublic: {
      type: Boolean,
      label: getLabel('api.forms.labels.public'),
    },
    groups: {
      type: Array,
      label: getLabel('api.forms.labels.groups'),
      optional: true,
      defaultValue: [],
    },
    'groups.$': { type: String },

    components: {
      type: Array,
      label: getLabel('api.forms.labels.components'),
      defaultValue: [],
    },
    'components.$': { type: Component },
  },
  { clean: { removeEmptyStrings: false } },
);

Forms.publicFields = {
  title: 1,
  desc: 1,
  owner: 1,
  isPublic: 1,
  isModel: 1,
  createdAt: 1,
  groups: 1,
  components: 1,
};

Forms.attachSchema(Forms.schema);

export default Forms;
