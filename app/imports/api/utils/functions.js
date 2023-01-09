import { Meteor } from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import SimpleSchema from 'simpl-schema';

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

export function registerSchemaMessages() {
  const regExpMessages = [
    { exp: SimpleSchema.RegEx.Email, msg: 'SimpleSchema.RegEx.Email' },
    { exp: SimpleSchema.RegEx.EmailWithTLD, msg: 'SimpleSchema.RegEx.EmailWithTLD' },
    { exp: SimpleSchema.RegEx.Domain, msg: 'SimpleSchema.RegEx.Domain' },
    { exp: SimpleSchema.RegEx.WeakDomain, msg: 'SimpleSchema.RegEx.WeakDomain' },
    { exp: SimpleSchema.RegEx.IP, msg: 'SimpleSchema.RegEx.IP' },
    { exp: SimpleSchema.RegEx.IPv4, msg: 'SimpleSchema.RegEx.IPv4' },
    { exp: SimpleSchema.RegEx.IPv6, msg: 'SimpleSchema.RegEx.IPv6' },
    { exp: SimpleSchema.RegEx.Url, msg: 'SimpleSchema.RegEx.Url' },
    { exp: SimpleSchema.RegEx.Id, msg: 'SimpleSchema.RegEx.Id' },
    { exp: SimpleSchema.RegEx.ZipCode, msg: 'SimpleSchema.RegEx.ZipCode' },
    { exp: SimpleSchema.RegEx.Phone, msg: 'SimpleSchema.RegEx.Phone' },
  ];
  SimpleSchema.setDefaultMessages({
    messages: {
      en: {
        required: (ctx) => i18n.__('SimpleSchema.required', ctx),
        minString: (ctx) => i18n.__('SimpleSchema.minString', ctx),
        maxString: (ctx) => i18n.__('SimpleSchema.maxString', ctx),
        minNumber: (ctx) => i18n.__('SimpleSchema.minNumber', ctx),
        maxNumber: (ctx) => i18n.__('SimpleSchema.maxNumber', ctx),
        minNumberExclusive: (ctx) => i18n.__('SimpleSchema.minNumberExclusive', ctx),
        maxNumberExclusive: (ctx) => i18n.__('SimpleSchema.maxNumberExclusive', ctx),
        minDate: (ctx) => i18n.__('SimpleSchema.minDate', ctx),
        maxDate: (ctx) => i18n.__('SimpleSchema.maxDate', ctx),
        badDate: (ctx) => i18n.__('SimpleSchema.badDate', ctx),
        minCount: (ctx) => i18n.__('SimpleSchema.minCount', ctx),
        maxCount: (ctx) => i18n.__('SimpleSchema.maxCount', ctx),
        noDecimal: (ctx) => i18n.__('SimpleSchema.noDecimal', ctx),
        notAllowed: (ctx) => i18n.__('SimpleSchema.notAllowed', ctx),
        expectedType: (ctx) => {
          const finalCtx = { ...ctx };
          const i18nEntry = `SimpleSchema.dataTypes.${ctx.dataType}`;
          const typeTranslated = i18n.__(i18nEntry);
          if (typeTranslated !== i18nEntry) {
            // translatation for type is available
            finalCtx.dataType = typeTranslated;
          }
          return i18n.__('SimpleSchema.expectedType', finalCtx);
        },
        keyNotInSchema: (ctx) => i18n.__('SimpleSchema.keyNotInSchema', ctx),
        regEx({ label, regExp }) {
          // See if there's one where exp matches this expression
          let msgObj;
          if (regExp) {
            msgObj = regExpMessages.find((o) => o.exp && o.exp.toString() === regExp);
          }

          const regExpMessage = msgObj ? i18n.__(msgObj.msg) : i18n.__('SimpleSchema.RegEx.Default');

          return `${label} ${regExpMessage}`;
        },
      },
    },
  });
}

const levels = ['info', 'warning', 'error'];

function logServer(message, level = 'info') {
  if (!levels.includes(level)) throw new Meteor.Error('api.logging.logServer', i18n.__('api.logging.unknownLogLevel'));
  console.log(message); /* eslint-disable-line no-console */
}

export const validateEmail = (email) => {
  const re =
    /* eslint-disable-next-line max-len */
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getGroupName = (group) => {
  if (group.type !== 15) return group.name;

  return `[STRUC] ${group.name.slice(group.name.indexOf('_') + 1, group.name.length)}`;
};

export default logServer;
