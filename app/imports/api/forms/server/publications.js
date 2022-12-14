import { Meteor } from 'meteor/meteor';
import Forms from '../forms';

// publish one form

Meteor.publish('forms.one', function publishForm({ _id }) {
  return Forms.find({ _id });
});
