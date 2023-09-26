import { createInstance } from '@datapunt/matomo-tracker-react';

const { matomo } = Meteor.settings.public;

const instance =
  matomo?.urlBase && matomo?.siteIdQuestionnaire
    ? createInstance({
        urlBase: matomo.urlBase,
        siteId: matomo.siteIdQuestionnaire,
        //   userId: 'UID76903202', // optional, default value: `undefined`.
        // trackerUrl: `${urlBase}/matomo.php`, // optional, default value: `${urlBase}matomo.php`
        // srcUrl: `${urlBase}/matomo.js`, // optional, default value: `${urlBase}matomo.js`
        disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
        heartBeat: {
          // optional, enabled by default
          active: true, // optional, default value: true
          seconds: 10, // optional, default value: `15
        },
        linkTracking: false, // optional, default value: true
        configurations: {
          // optional, default value: {}
          // any valid matomo configuration, all below are optional
          disableCookies: true,
          // setSecureCookie: true,
          // setRequestMethod: 'POST',
        },
      })
    : null;

export default instance;
