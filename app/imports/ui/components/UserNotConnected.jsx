import React from 'react';
import { i18n } from 'meteor/universe:i18n';

export default function UserNotConnected() {
  return (
    <div className="flex center pad-10">
      <h1>{i18n.__('component.userNotConnected.notLoggedIn')}</h1>
    </div>
  );
}
