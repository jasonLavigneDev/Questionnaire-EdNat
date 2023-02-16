import i18n from 'meteor/universe:i18n';

export function getLabel(i18nLabel) {
  return () => i18n.__(i18nLabel);
}

export function getLang() {
  return (
    navigator.languages?.[0] || navigator.language || navigator.browserLanguage || navigator.userLanguage || 'en-US'
  );
}

export function mergeDeep(...objects) {
  const isObject = (obj) => obj && typeof obj === 'object';

  return objects.reduce((prev, obj) => {
    const newData = prev;
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        newData[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        newData[key] = mergeDeep(pVal, oVal);
      } else {
        newData[key] = oVal;
      }
    });

    return newData;
  }, {});
}
