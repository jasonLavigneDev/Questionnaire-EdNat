import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import i18n from 'meteor/universe:i18n';
import { getLabel } from '../utils';

import Forms, { Component, Answers } from './forms';

function _createForm(
  title,
  description,
  owner,
  isModel,
  isPublic,
  editableAnswers,
  groups,
  components,
  expirationDate,
  dataDeletionDate,
) {
  return Forms.insert({
    title,
    description,
    owner,
    isModel,
    isPublic,
    editableAnswers,
    groups,
    components,
    expirationDate,
    dataDeletionDate,
  });
}

function _updateForm(
  id,
  title,
  description,
  owner,
  isModel,
  isPublic,
  editableAnswers,
  groups,
  components,
  expirationDate,
  dataDeletionDate,
) {
  Forms.update(
    { _id: id },
    {
      $set: {
        title,
        description,
        owner,
        isModel,
        isPublic,
        editableAnswers,
        groups,
        components,
        expirationDate,
        dataDeletionDate,
      },
    },
  );
}

export const createForm = new ValidatedMethod({
  name: 'forms.createForm',
  validate: new SimpleSchema({
    title: { type: String, label: getLabel('api.forms.labels.title') },
    description: { type: String, optional: true, label: getLabel('api.forms.labels.description') },
    isModel: { type: Boolean, label: getLabel('api.forms.labels.isModel') },
    isPublic: { type: Boolean, label: getLabel('api.forms.labels.public') },
    editableAnswers: { type: Boolean, label: getLabel('api.forms.labels.editableAnswers') },
    groups: { type: Array, optional: true, label: getLabel('api.forms.labels.groups') },
    'groups.$': { type: String },
    components: { type: Array, label: getLabel('api.forms.labels.components') },
    'components.$': { type: Component },
    expirationDate: { type: Date },
    dataDeletionDate: { type: Date },
  }).validator(),

  async run({
    title,
    description,
    isModel,
    isPublic,
    editableAnswers,
    groups,
    components,
    expirationDate,
    dataDeletionDate,
  }) {
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.noUser', 'api.forms.createForm.notLoggedIn');
    }
    const newId = _createForm(
      title,
      description,
      this.userId,
      isModel,
      isPublic,
      editableAnswers,
      groups,
      components,
      expirationDate,
      dataDeletionDate,
    );
    const form = await Forms.findOneAsync({ _id: newId });
    if (!form) {
      throw new Meteor.Error('api.forms.deleteForm.notFound', i18n.__('api.forms.deleteForm.notExist'));
    }
    return form._id;
  },
});

export const updateForm = new ValidatedMethod({
  name: 'forms.updateForm',
  validate: new SimpleSchema({
    id: { type: String, label: getLabel('api.forms.labels.id') },
    title: { type: String, label: getLabel('api.forms.labels.title') },
    description: { type: String, label: getLabel('api.forms.labels.description') },
    isModel: { type: Boolean, label: getLabel('api.forms.labels.isModel') },
    isPublic: { type: Boolean, label: getLabel('api.forms.labels.public') },
    editableAnswers: { type: Boolean, label: getLabel('api.forms.labels.editableAnswers') },
    groups: { type: Array, optional: true, label: getLabel('api.forms.labels.groups') },
    'groups.$': { type: String },
    components: { type: Array, label: getLabel('api.forms.labels.components') },
    'components.$': { type: Component },
    expirationDate: { type: Date },
    dataDeletionDate: { type: Date },
  }).validator(),

  async run({
    id,
    title,
    description,
    isModel,
    isPublic,
    editableAnswers,
    groups,
    components,
    expirationDate,
    dataDeletionDate,
  }) {
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.noUser', i18n.__('api.forms.createForm.notLoggedIn'));
    }

    const form = await Forms.findOneAsync({ _id: id });
    if (this.userId !== form.owner) {
      throw new Meteor.Error('api.forms.deleteForm.permissionDenied', i18n.__('api.forms.deleteForm.notOwner'));
    }

    _updateForm(
      id,
      title,
      description,
      this.userId,
      isModel,
      isPublic,
      editableAnswers,
      groups,
      components,
      expirationDate,
      dataDeletionDate,
    );

    return form._id;
  },
});

export const deleteForm = new ValidatedMethod({
  name: 'forms.deleteForm',
  validate: new SimpleSchema({
    id: { type: String, label: getLabel('api.forms.labels.id') },
  }).validator(),

  async run({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.noUser', i18n.__('api.forms.createForm.notLoggedIn'));
    }

    const form = await Forms.findOneAsync({ _id: id });
    if (!form) {
      throw new Meteor.Error('api.forms.deleteForm.notFound', i18n.__('api.forms.deleteForm.notExist'));
    }
    if (form.owner !== this.userId) {
      throw new Meteor.Error('api.forms.deleteForm.permissionDenied', i18n.__('api.forms.deleteForm.notOwner'));
    }

    await Forms.removeAsync({ _id: id });
  },
});

export const duplicateForm = new ValidatedMethod({
  name: 'forms.duplicateForm',
  validate: new SimpleSchema({
    _id: { type: String, label: getLabel('api.forms.labels.id') },
  }).validator(),

  async run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.noUser', i18n.__('api.forms.createForm.notLoggedIn'));
    }

    const form = await Forms.findOneAsync({ _id });
    if (!form) {
      throw new Meteor.Error('api.forms.deleteForm.notFound', i18n.__('api.forms.deleteForm.notExist'));
    }
    if (form.owner !== this.userId) {
      throw new Meteor.Error('api.forms.deleteForm.permissionDenied', i18n.__('api.forms.deleteForm.notOwner'));
    }

    const today = new Date();

    const newForm = form;
    newForm.title = form.title + ' - Copie';
    newForm.description = form.description || '';

    newForm.expirationDate = Meteor.isTest
      ? 60
      : new Date(today.setDate(today.getDate() + Meteor.settings.public.defaultFormExpirationDelay));

    newForm.dataDeletionDate = Meteor.isTest
      ? new Date(today.setDate(today.getDate() + 90))
      : new Date(
          today.setDate(
            today.getDate() +
              (Meteor.settings.public.defaultFormExpirationDelay + Meteor.settings.public.dataDeletionDelay),
          ),
        );

    const newId = _createForm(
      newForm.title,
      newForm.description,
      this.userId,
      newForm.isModel,
      newForm.isPublic,
      newForm.editableAnswers,
      newForm.groups,
      newForm.components,
      newForm.expirationDate,
      newForm.dataDeletionDate,
    );

    const duplicatedForm = await Forms.findOneAsync({ _id: newId });
    if (!duplicateForm) {
      throw new Meteor.Error('api.forms.deleteForm.notFound', i18n.__('api.forms.deleteForm.notExist'));
    }
    return duplicatedForm._id;
  },
});

export const upsertAnswers = new ValidatedMethod({
  name: 'forms.upsertAnswers',
  validate: new SimpleSchema({
    formId: { type: String, label: getLabel('api.forms.labels.id') },
    newAnswer: { type: Answers },
    token: { type: String, optional: true, label: getLabel('api.forms.labels.formAnswers.modifyAnswersToken') },
  }).validator(),

  async run({ formId, newAnswer, token }) {
    const currentForm = await Forms.findOneAsync({ _id: formId });
    if (!currentForm) {
      throw new Meteor.Error('api.forms.upsertAnswers.notFound', i18n.__('api.forms.upsertAnswers.notExist'));
    }
    if (!currentForm.active) {
      throw new Meteor.Error('api.forms.upsertAnswers.notActive', i18n.__('api.forms.upsertAnswers.notActive'));
    }
    if (newAnswer.userId !== null && newAnswer.userId !== this.userId) {
      // if new answer userId exists, it must be the connected userId
      throw new Meteor.Error('api.forms.upsertAnswers.wrongUser', i18n.__('api.forms.upsertAnswers.wrongUser'));
    }
    if (newAnswer.userId === null && !currentForm.isPublic) {
      // new answer for private forms must have a userId
      throw new Meteor.Error('api.forms.upsertAnswers.noUserIdFound', i18n.__('api.forms.upsertAnswers.noUserIdFound'));
    }

    let newTab = currentForm.formAnswers || [];
    let modifyAnswersToken = '';
    if (newAnswer.userId === null && !token) {
      // no userId in answer and no token => first answer for this form
      if (currentForm.editableAnswers) {
        // form has editable answers => generate token
        modifyAnswersToken = Random.secret();
        newTab.push({ ...newAnswer, modifyAnswersToken });
      } else {
        // no token needed
        newTab.push(newAnswer);
      }
    } else if (newAnswer.userId === null && token) {
      // no userId in answer but token given so this form already been answered => find the answer with that token
      const index = newTab.findIndex((answer) => answer.modifyAnswersToken === token);
      if (index === -1) {
        // no answer with this token
        throw new Meteor.Error(
          'api.forms.upsertAnswers.tokenNotFound',
          i18n.__('api.forms.upsertAnswers.tokenNotFound'),
        );
      } else {
        // answer edited with token
        newTab[index] = { ...newAnswer, modifyAnswersToken: newTab[index].modifyAnswersToken };
      }
    } else {
      // all other cases
      // TO BE REACTOR //
      const index = newTab.findIndex((answer) => answer.userId === newAnswer.userId);
      if (index === -1) {
        newTab.push(newAnswer);
      } else {
        newTab[index] = newAnswer;
      }
      ///////////////////
    }

    await Forms.updateAsync({ _id: formId }, { $set: { formAnswers: newTab } });
    return modifyAnswersToken;
  },
});

Meteor.methods({
  'forms.clearAnswers': async function (formId) {
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.notLoggedIn', i18n.__('api.forms.createForm.notLoggedIn'));
    }
    const form = await Forms.findOneAsync({ _id: formId });
    if (form) {
      if (form.owner !== this.userId) {
        throw new Meteor.Error('api.forms.deleteForm.permissionDenied', i18n.__('api.forms.deleteForm.notOwner'));
      }
      await Forms.updateAsync({ _id: formId }, { $set: { formAnswers: [] } });
    }
  },
});

Meteor.methods({
  'forms.toggleActive': async function (formId, active) {
    const form = await Forms.findOneAsync({ _id: formId });
    if (form) {
      if (form.owner == this.userId) {
        form.active = active;
        await Forms.updateAsync({ _id: formId }, { $set: { active: form.active } });
        if (Meteor.isServer && form.groups.length && form.active && !Meteor.isTest) {
          // eslint-disable-next-line global-require
          const sendnotif = require('../notifications/server/notifSender').default;

          sendnotif({
            groups: form.groups,
            title: 'Nouveau questionnaire',
            content: `Le questionnaire ${form.title} a été créé pour votre groupe`,
            formId: form._id,
          });
        }
      } else {
        throw new Meteor.Error('api.forms.deleteForm.permissionDenied', i18n.__('api.forms.deleteForm.notOwner'));
      }
    } else {
      throw new Meteor.Error('api.forms.deleteForm.notExist', i18n.__('api.forms.deleteForm.notExist'));
    }
  },
});

Meteor.methods({
  'forms.getOne': async (id) => {
    const form = await Forms.findOneAsync({ _id: id });
    const owner = form ? await Meteor.users.findOneAsync({ _id: form.owner }) : { firstName: '', lastName: '' };
    return { form, owner: { firstName: owner.firstName, lastName: owner.lastName } };
  },
});

export const getOneFormFromuser = new ValidatedMethod({
  name: 'forms.getOneFromUser',
  validate: null,

  async run(id) {
    if (!id) {
      return null;
    }
    if (!this.userId) {
      throw new Meteor.Error('api.forms.createForm.noUser', i18n.__('api.forms.createForm.notLoggedIn'));
    }

    const form = await Forms.findOneAsync({ _id: id });
    if (form.owner !== this.userId) {
      throw new Meteor.Error('api.forms.deleteForm.permissionDenied', i18n.__('api.forms.deleteForm.notOwner'));
    }

    return form;
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
      throw new Meteor.Error('api.forms.createForm.noUser', i18n.__('api.forms.createForm.notLoggedIn'));
    }
  },
});
