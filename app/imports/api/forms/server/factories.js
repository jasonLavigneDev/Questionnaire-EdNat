import { faker } from '@faker-js/faker';
import { Factory } from 'meteor/dburles:factory';

import Forms from '../forms';

export const genFormComponent = () => ({
  id: faker.datatype.uuid(),
  type: faker.helpers.arrayElement(['radio', 'select', 'checkbox', 'date', 'number', 'text', 'textarea']),
  title: faker.lorem.words(),
  choices: faker.random.words().split(' '),
});

Factory.define('form', Forms, {
  title: faker.lorem.words(),
  desc: faker.lorem.sentence(),
  isModel: faker.datatype.boolean(),
  isPublic: faker.datatype.boolean(),
  owner: faker.name.middleName(),
  components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
});
