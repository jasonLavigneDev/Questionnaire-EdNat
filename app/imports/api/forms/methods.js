import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { getLabel } from '../utils';

import Forms, { Component } from './forms';

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

  run({ title, desc, owner, isModel, isPublic, groups, components }) {
    _createForm(title, desc, owner, isModel, isPublic, groups, components);
    const form = Forms.findOne({ title });
    return form._id;
  },
});
