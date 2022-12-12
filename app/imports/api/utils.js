import i18n from 'meteor/universe:i18n';

export function getLabel(i18nLabel) {
  return () => i18n.__(i18nLabel);
}
