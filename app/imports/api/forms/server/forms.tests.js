/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'chai';
import { Factory } from 'meteor/dburles:factory';
import { faker } from '@faker-js/faker';
import { Accounts } from 'meteor/accounts-base';
import Forms from '../forms';
import './factories';
import { genFormComponent } from './factories';
import { createForm, deleteForm, duplicateForm, getUserForms } from '../methods';

const today = new Date();
const expirationDateTest = new Date(today.setDate(today.getDate() + 60));
const dataExpirationDate = new Date(today.setDate(today.getDate() + 90));

describe('forms', function () {
  describe('mutators', function () {
    it('builds correctly from factory', function () {
      const form = Factory.create('form');
      assert.typeOf(form, 'object');
    });
  });
  describe('methods', function () {
    let userId;
    beforeEach(function () {
      Forms.remove({});
      Meteor.users.remove({});
      const email = faker.internet.email();
      userId = Accounts.createUser({
        email,
        username: email,
        password: 'toto',
      });
    });
    it('does create a form', async function () {
      const newform = {
        title: 'yo',
        description: faker.lorem.sentence(),
        isModel: faker.datatype.boolean(),
        isPublic: faker.datatype.boolean(),
        editableAnswers: faker.datatype.boolean(),
        expirationDate: expirationDateTest,
        dataDeletionDate: dataExpirationDate,
        components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
      };
      await createForm._execute({ userId }, newform);
      const form = await Forms.findOneAsync({ title: 'yo' });
      assert.typeOf(form, 'object');
    });
    it('does get a form', async function () {
      const newformId = Factory.create('form', { owner: userId })._id;
      const form = await Meteor.callAsync('forms.getOne', newformId);
      assert.typeOf(form, 'object');
    });
    it('does get user forms', async function () {
      const newform = {
        title: 'yo',
        description: faker.lorem.sentence(),
        isModel: faker.datatype.boolean(),
        isPublic: faker.datatype.boolean(),
        editableAnswers: faker.datatype.boolean(),
        expirationDate: expirationDateTest,
        dataDeletionDate: dataExpirationDate,
        components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
      };
      await createForm._execute({ userId }, newform);
      const newform2 = {
        title: 'yo2',
        description: faker.lorem.sentence(),
        isModel: faker.datatype.boolean(),
        isPublic: faker.datatype.boolean(),
        editableAnswers: faker.datatype.boolean(),
        expirationDate: expirationDateTest,
        dataDeletionDate: dataExpirationDate,
        components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
      };
      await createForm._execute({ userId: faker.name.middleName() }, newform2);
      const forms = await getUserForms._execute({ userId });
      assert.equal(forms.length, 1);
      assert.equal(forms[0].title, 'yo');
    });
    it('does delete user forms', async function () {
      const newform = {
        title: 'yo',
        description: faker.lorem.sentence(),
        isModel: faker.datatype.boolean(),
        isPublic: faker.datatype.boolean(),
        editableAnswers: faker.datatype.boolean(),
        expirationDate: expirationDateTest,
        dataDeletionDate: dataExpirationDate,
        components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
      };
      await createForm._execute({ userId }, newform);
      const form = Forms.findOne({ title: newform.title });

      await deleteForm._execute({ userId }, { id: form._id });
      const formDeleted = Forms.findOne({ _id: deleteForm._id });
      assert.equal(formDeleted, undefined);
    });
    it('does duplicate user forms', async function () {
      const newform = {
        title: 'yo',
        description: faker.lorem.sentence(),
        isModel: faker.datatype.boolean(),
        isPublic: faker.datatype.boolean(),
        editableAnswers: faker.datatype.boolean(),
        expirationDate: expirationDateTest,
        dataDeletionDate: dataExpirationDate,
        components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
      };
      await createForm._execute({ userId }, newform);
      const form = Forms.findOne({ title: newform.title });

      await duplicateForm._execute({ userId }, { _id: form._id });
      const formDuplicated = Forms.findOne({ title: form.title + ' - Copie' });
      assert.equal(formDuplicated.title, form.title + ' - Copie');
    });
  });
});
