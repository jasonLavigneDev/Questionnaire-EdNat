/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'chai';
import { Factory } from 'meteor/dburles:factory';
import { faker } from '@faker-js/faker';
import Forms from '../forms';
import './factories';
import { genFormComponent } from './factories';
import { createForm } from '../methods';

describe('forms', function () {
  describe('mutators', function () {
    it('builds correctly from factory', function () {
      const form = Factory.create('form');
      assert.typeOf(form, 'object');
    });
  });
  describe('methods', function () {
    beforeEach(function () {
      Forms.remove({});
    });
    it('does create a form', function () {
      const newform = {
        title: 'yo',
        desc: faker.lorem.sentence(),
        isModel: faker.datatype.boolean(),
        isPublic: faker.datatype.boolean(),
        owner: faker.name.middleName(),
        components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
      };
      createForm._execute({}, newform);
      const form = Forms.findOne({ title: 'yo' });
      assert.typeOf(form, 'object');
    });
    it('does get a form', async function () {
      const newformId = Factory.create('form')._id;
      const form = await Meteor.callAsync('forms.getOne', newformId);
      assert.typeOf(form, 'object');
    });
  });
});
