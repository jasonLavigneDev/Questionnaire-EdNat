import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';

export function isActive(userId) {
  if (!userId) return false;
  const user = Meteor.users.findOne(userId, { fields: { isActive: 1 } });
  if (user.isActive === true) return true;
  return false;
}

export function getLang() {
  return (
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.browserLanguage ||
    navigator.userLanguage ||
    'en-US'
  );
}

export function getLabel(i18nLabel) {
  return () => i18n.__(i18nLabel);
}
