import i18n from 'meteor/universe:i18n';

export function getLabel(i18nLabel) {
  return () => i18n.__(i18nLabel);
}

export function getLang() {
  return (
    navigator.languages?.[0] || navigator.language || navigator.browserLanguage || navigator.userLanguage || 'en-US'
  );
}
