import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { getLabel } from '../utils';

import Forms, { Component } from './forms';
import { useContext } from 'react';
import { UserContext } from '../../ui/contexts/UserContext';

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

function _updateForm(id, title, desc, owner, isModel, isPublic, groups, components) {
  Forms.update(
    { _id: id },
    {
      $set: { title, desc, owner, isModel, isPublic, groups, components },
    },
  );
}

export const createForm = new ValidatedMethod({
  name: 'forms.createForm',
  validate: new SimpleSchema({
    title: { type: String, label: getLabel('api.forms.labels.title') },
    desc: { type: String, label: getLabel('api.forms.labels.desc') },
    isModel: { type: Boolean, label: getLabel('api.forms.labels.isModel') },
    isPublic: { type: Boolean, label: getLabel('api.forms.labels.public') },
    groups: { type: Array, optional: true, label: getLabel('api.forms.labels.groups') },
    'groups.$': { type: String },
    components: { type: Array, label: getLabel('api.forms.labels.components') },
    'components.$': { type: Component },
  }).validator(),

  async run({ title, desc, isModel, isPublic, groups, components }) {
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.notLoggedIn', "Pas d'utilisateur connecté");
    }
    _createForm(title, desc, this.userId, isModel, isPublic, groups, components);
    const form = await Forms.findOneAsync({ title });
    return form._id;
  },
});

export const updateForm = new ValidatedMethod({
  name: 'forms.updateForm',
  validate: new SimpleSchema({
    id: { type: String, label: getLabel('api.forms.labels.id') },
    title: { type: String, label: getLabel('api.forms.labels.title') },
    desc: { type: String, label: getLabel('api.forms.labels.desc') },
    isModel: { type: Boolean, label: getLabel('api.forms.labels.isModel') },
    isPublic: { type: Boolean, label: getLabel('api.forms.labels.public') },
    groups: { type: Array, optional: true, label: getLabel('api.forms.labels.groups') },
    'groups.$': { type: String },
    components: { type: Array, label: getLabel('api.forms.labels.components') },
    'components.$': { type: Component },
  }).validator(),

  async run({ id, title, desc, isModel, isPublic, groups, components }) {
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.notLoggedIn', "Pas d'utilisateur connecté");
    }
    _updateForm(id, title, desc, this.userId, isModel, isPublic, groups, components);
    const form = await Forms.findOneAsync({ _id: id });
    return form._id;
  },
});

Meteor.methods({
  'forms.updateAnswers': async (formId, newAnswer) => {
    const a = await Forms.findOneAsync({ _id: formId });
    let newTab = [];
    if (a) {
      if (a.formAnswers) {
        newTab = a.formAnswers;
        const index = newTab.findIndex((answer) => answer.userId === newAnswer.userId);
        if (index === -1) {
          newTab.push(newAnswer);
        } else {
          newTab[index] = newAnswer;
        }
      } else {
        newTab.push(newAnswer);
      }

      await Forms.updateAsync({ _id: formId }, { $set: { formAnswers: newTab } });
    }
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

export const getUserForms = new ValidatedMethod({
  name: 'forms.getUserForms',
  validate: null,

  async run() {
    if (this.userId) {
      const res = await Forms.find({ owner: this.userId }).mapAsync((x) => x);
      return res;
    } else {
      throw new Meteor.Error('api.forms.getUserForms.notLoggedIn', "Pas d'utilisateur connecté");
    }
  },
});
