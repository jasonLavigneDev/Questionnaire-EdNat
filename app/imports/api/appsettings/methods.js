import AppSettings from './appsettings';

Meteor.methods({
  'appsettings.all': async () => {
    return await AppSettings.findOneAsync({ _id: 'settings' });
  },
});
