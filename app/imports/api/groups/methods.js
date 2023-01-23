import Groups from './groups';

export const getUserGroups = new ValidatedMethod({
  name: 'groups.getUserGroups',
  validate: null,

  async run() {
    if (this.userId) {
      const user = await Meteor.users.findOneAsync({ _id: this.userId });

      if (user) {
        const res = await Groups.find({ _id: { $in: user.favGroups } }).mapAsync((x) => x);
        console.log(res);
        return res;
      } else {
        throw new Meteor.Error('api.forms.getUserForms.notLoggedIn', "Pas d'utilisateur connecté");
      }
    } else {
      throw new Meteor.Error('api.forms.getUserForms.notLoggedIn', "Pas d'utilisateur connecté");
    }
  },
});
