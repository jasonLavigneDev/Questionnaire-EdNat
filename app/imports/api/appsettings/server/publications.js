import AppSettings from '../appsettings';

Meteor.publish('appsettings.maintenance', () => {
  const data = AppSettings.find({ _id: 'settings' }, { fields: { maintenance: 1, textMaintenance: 1 }, limit: 1 });
  return data;
});
