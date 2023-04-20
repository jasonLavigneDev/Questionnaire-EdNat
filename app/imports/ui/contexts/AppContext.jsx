import React, { createContext, useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet } from 'react-router-dom';
import AppSettings from '../../api/appsettings/appsettings';
import SiteInMaintenance from '../components/SiteInMaintenance';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const settings = useTracker(() => {
    Meteor.subscribe('appsettings.maintenance');
    const settingsData = AppSettings.findOne(
      { _id: 'settings' },
      { fields: { maintenance: 1, textMaintenance: 1 }, sort: { _id: 1 }, limit: 1 },
    );
    return settingsData;
  });

  if (settings) {
    const isMaintenance = settings.maintenance;
    return (
      <AppContext.Provider value={{ isMaintenance }}>
        {!isMaintenance ? <Outlet /> : <SiteInMaintenance appsettings={settings} />}
      </AppContext.Provider>
    );
  }
};
