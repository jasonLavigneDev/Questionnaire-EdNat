import { faker } from '@faker-js/faker';
import { Factory } from 'meteor/dburles:factory';

import Forms from '../forms';

const today = new Date();
const expirationDateTest = new Date(today.setDate(today.getDate() + 60));
const dataExpirationDateTest = new Date(today.setDate(today.getDate() + 90));

export const genFormComponent = () => ({
  id: faker.datatype.uuid(),
  type: faker.helpers.arrayElement(['radio', 'select', 'checkbox', 'date', 'number', 'text', 'textarea']),
  title: faker.lorem.words(),
  choices: faker.random.words().split(' '),
  answerRequired: faker.datatype.boolean(),
});

Factory.define('form', Forms, {
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  isModel: faker.datatype.boolean(),
  isPublic: faker.datatype.boolean(),
  editableAnswers: faker.datatype.boolean(),
  owner: faker.name.middleName(),
  expirationDate: expirationDateTest,
  dataDeletionDate: dataExpirationDateTest,
  components: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () => genFormComponent()),
});
