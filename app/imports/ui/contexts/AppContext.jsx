import React, { createContext, useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Outlet } from 'react-router-dom';
import AppSettings from '../../api/appsettings/appsettings';
import SiteInMaintenance from '../components/SiteInMaintenance';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [settings, setSettings] = useState();
  const promiseSettings = useTracker(async () => {
    return await Meteor.callAsync('appsettings.all');
  });

  promiseSettings.then((value) => {
    setSettings(value);
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
