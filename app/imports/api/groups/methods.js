import Groups from './groups';

export const getUserGroups = new ValidatedMethod({
  name: 'groups.getUserGroups',
  validate: null,

  async run() {
    if (this.userId) {
      console.log(this.userId);
      const user = await Meteor.users.findOneAsync({ _id: this.userId });
      console.log(user);
      if (user) {
        const res = await Groups.find({ _id: { $in: this.user.favGroups } }).mapAsync((x) => x);
        console.log(res);
        return res;
      } else {
        return [];
      }
    } else {
      throw new Meteor.Error('api.forms.getUserForms.notLoggedIn', "Pas d'utilisateur connecté");
    }
  },
});
