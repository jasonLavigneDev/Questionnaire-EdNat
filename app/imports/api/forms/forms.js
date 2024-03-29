import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { getLabel } from '../utils';

const Forms = new Mongo.Collection('forms');

const today = new Date();
const expirationDelay = Meteor.settings.public.defaultFormExpirationDelay || 60;
const deletionDelay = Meteor.settings.public.dataDeletionDelay || 30;

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
  id: {
    type: String,
    label: getLabel('api.forms.labels.component.id'),
  },
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
  answerRequired: {
    type: Boolean,
    defaultValue: false,
  },
});

export const Answers = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
    label: getLabel('api.forms.labels.formAnswers.userId'),
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

  modifyAnswersToken: {
    type: String,
    optional: true,
    label: getLabel('api.forms.labels.formAnswers.modifyAnswersToken'),
  },

  answers: {
    type: Array,
    optional: true,
    label: getLabel('api.forms.labels.formAnswers.answer'),
  },
  'answers.$': { type: Object, blackbox: true },
});

Forms.schema = new SimpleSchema(
  {
    title: {
      type: String,
      min: 1,
      max: 96,
      label: getLabel('api.forms.labels.title'),
    },
    description: {
      type: String,
      optional: true,
      max: 256,
      label: getLabel('api.forms.labels.description'),
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
    active: {
      type: Boolean,
      defaultValue: false,
      label: getLabel('api.forms.labels.active'),
    },
    editableAnswers: {
      type: Boolean,
      defaultValue: false,
      label: getLabel('api.forms.labels.editableAnswers'),
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

    formAnswers: {
      type: Array,
      label: getLabel('api.forms.labels.formAnswers.answers'),
      optional: true,
    },
    'formAnswers.$': { type: Answers },

    expirationDate: {
      type: Date,
      label: getLabel('api.forms.labels.expirationDate'),
      optional: false,
      defaultValue: new Date(today.setDate(today.getDate() + expirationDelay)),
    },

    dataDeletionDate: {
      type: Date,
      label: getLabel('api.forms.labels.dataDeletionDate'),
      optional: false,
      defaultValue: new Date(today.setDate(today.getDate() + (expirationDelay + deletionDelay))),
    },
  },
  { clean: { removeEmptyStrings: false } },
);

Forms.publicFields = {
  title: 1,
  description: 1,
  owner: 1,
  isPublic: 1,
  isModel: 1,
  createdAt: 1,
  groups: 1,
  editableAnswers: 1,
  components: 1,
  dataDeletionDate: 1,
  expirationDate: 1,
};

Forms.attachSchema(Forms.schema);

export default Forms;
