/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { assert } from 'chai';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Factory } from 'meteor/dburles:factory';
import Forms from '../forms';
import './factories';
import { createForm } from '../methods';

describe('forms', function () {
  describe('mutators', function () {
    it('builds correctly from factory', function () {
      const form = Factory.create('form');
      assert.typeOf(form, 'object');
    });
  });
  describe('methods', function () {
    describe('createForm', function () {
      it('does create an article with basic user', function () {
        const newform = Factory.create('form', { title: 'yo' });
        console.log('newform', newform);
        createForm._execute({}, newform);
        const form = Forms.findOne({ title: 'yo' });
        assert.typeOf(form, 'object');
      });
    });
  });
});
