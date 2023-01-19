import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { getLabel } from '../utils';

import Forms, { Answer, Answers, Component } from './forms';
import { Form } from 'react-router-dom';

function _createForm(title, desc, owner, isModel, isPublic, groups, components) {
  Forms.insert({
    title,
    desc,
    owner,
    isModel,
    isPublic,
    groups,
    components,
  });
}

export const createForm = new ValidatedMethod({
  name: 'forms.createForm',
  validate: new SimpleSchema({
    title: { type: String, label: getLabel('api.forms.labels.title') },
    desc: { type: String, label: getLabel('api.forms.labels.desc') },
    owner: { type: String, label: getLabel('api.forms.labels.owner') },
    isModel: { type: Boolean, label: getLabel('api.forms.labels.isModel') },
    isPublic: { type: Boolean, label: getLabel('api.forms.labels.public') },
    groups: { type: Array, optional: true, label: getLabel('api.forms.labels.groups') },
    'groups.$': { type: String },
    components: { type: Array, label: getLabel('api.forms.labels.components') },
    'components.$': { type: Component },
  }).validator(),

  async run({ title, desc, owner, isModel, isPublic, groups, components }) {
    _createForm(title, desc, owner, isModel, isPublic, groups, components);
    const form = Forms.findOne({ title });
    return await form._id;
  },
});

export const updateAnswers = new ValidatedMethod({
  name: 'forms.updateAnswers',
  validate: new SimpleSchema({
    formId: { type: String, label: getLabel('api.forms.labels.id') },
    answers: {
      type: Answers,
      label: getLabel('api.forms.labels.answers'),
      optional: true,
    },
  }).validator(),

  async run({ formId, answers }) {
    return await Forms.updateAsync({ _id: formId }, { $set: { answers } });
  },
});

Meteor.methods({
  'forms.getOne': async (id) => {
    return await Forms.findOneAsync({ _id: id });
  },
});

Meteor.methods({
  'forms.getAll': async () => {
    const res = await Forms.find().mapAsync((x) => x);
    return res;
  },
});
