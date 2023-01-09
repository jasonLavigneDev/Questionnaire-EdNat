import { Meteor } from 'meteor/meteor';

// publish additional fields for current user
Meteor.publish('userData', function publishUserData() {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: Meteor.users.selfFields,
      },
    );
  }
  return this.ready();
});

// Meteor.publish('users.searchAll', function () {
//   return Meteor.users.find(
//     {},
//     {
//       sort: { 'emails.address': 1 },
//       fields: { emails: 1 },
//     },
//   );
// });
