import { Meteor } from 'meteor/meteor';
import Forms from '../forms';

// publish one form

Meteor.publish('forms.one', function publishForm({ _id }) {
  try {
    new SimpleSchema({
      _id: {
        type: String,
      },
    }).validate({ _id });
  } catch (err) {
    return this.ready();
  }

  return Forms.find({ _id });
});
