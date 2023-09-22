import Groups from './groups';
import { Roles } from 'meteor/alanning:roles';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const getStrucGroupName = (group) => {
  if (group.type !== 15) return group.name;

  return `[STRUC] ${group.name.slice(group.name.indexOf('_') + 1, group.name.length)}`;
};

export const getUserGroups = new ValidatedMethod({
  name: 'groups.getUserGroups',
  validate: null,

  async run() {
    if (this.userId) {
      const user = await Meteor.users.findOneAsync({ _id: this.userId });

      if (user) {
        const groupIdList = Roles.getScopesForUser(this.userId, ['member', 'animator', 'admin']);
        const groups = await Groups.find({ _id: { $in: groupIdList } }).mapAsync((grp) => grp);
        return groups;
      } else {
        return null;
      }
    } else {
      return null;
    }
  },
});
