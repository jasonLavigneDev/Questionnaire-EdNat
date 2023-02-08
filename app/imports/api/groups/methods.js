import Groups from './groups';

export const getUserGroups = new ValidatedMethod({
  name: 'groups.getUserGroups',
  validate: null,

  async run() {
    if (this.userId) {
      const user = await Meteor.users.findOneAsync({ _id: this.userId });

      if (user) {
        const res = await Groups.find({ _id: { $in: user.favGroups } }).mapAsync((x) => x);
        return res;
      } else {
        throw new Meteor.Error('api.forms.createForm.noUser', i18n.__('api.forms.createForm.notLoggedIn'));
      }
    } else {
      throw new Meteor.Error('api.forms.createForm.noUser', i18n.__('api.forms.createForm.notLoggedIn'));
    }
  },
});
