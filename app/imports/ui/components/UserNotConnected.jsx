import React from 'react';
import { i18n } from 'meteor/universe:i18n';

export default function UserNotConnected() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
      <h1>{i18n.__('component.userNotConnected.notLoggedIn')}</h1>
    </div>
  );
}
