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

Meteor.methods({
  'forms.getUserForms': async () => {
    if (Meteor.userId()) {
      const res = await Forms.find({ owner: Meteor.userId() }).mapAsync((x) => x);
      return res;
    } else {
      throw new Meteor.Error('api.forms.getUserForms.notLoggedIn', "Pas d'utilisateur connecté");
    }
  },
});
