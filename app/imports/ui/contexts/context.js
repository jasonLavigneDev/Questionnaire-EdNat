/* eslint-disable no-console */
import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import reducer, { MOBILE_SIZE } from './reducer';
import { getLang } from '../../api/utils/functions';
import { useWindowSize } from '../../api/utils/hooks';
import AppSettings from '../../api/appsettings/appsettings';

const initialState = {
  user: Meteor.user(),
  userId: null,
  isMobile: window.innerWidth < MOBILE_SIZE,
  language: getLang().substr(0, 2),
  loggingIn: Accounts.loggingIn(),
  authenticated: false,
  appsettings: { maintenance: false, textMaintenance: '' },
};

const logger = (state, action) => {
  const newState = reducer(state, action);
  if (Meteor.isDevelopment) {
    console.groupCollapsed('Action Type:', action.type);
    console.log('Prev state: ', state);
    console.log('Next state: ', newState);
    console.groupEnd();
  }
  return newState;
};

const Store = ({ children, loggingIn, user, userId, authenticated, loading, appsettings }) => {
  const [state, dispatch] = useReducer(logger, initialState);
  const { width } = useWindowSize();

  useEffect(() => {
    dispatch({ type: 'mobile', data: { width } });
  }, [width]);

  useEffect(() => {
    dispatch({
      type: 'user',
      data: {
        loading,
        loggingIn,
        user,
        userId,
        authenticated,
        appsettings,
      },
    });
    if (user && user.language && user.language !== state.language) {
      dispatch({
        type: 'language',
        data: {
          language: user.language,
        },
      });
    }
  }, [loggingIn, user, userId, authenticated, loading, appsettings]);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

export const Context = createContext(initialState);
export const useAppContext = () => useContext(Context);

const DynamicStore = withTracker(() => {
  const userHandle = Meteor.subscribe('userData');
  const settingsHandle = Meteor.subscribe('appsettings.all');
  const loading = !userHandle.ready() || !settingsHandle.ready();
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const appsettings = AppSettings.findOne(
    { _id: 'settings' },
    { fields: AppSettings.publicFields, sort: { _id: 1 }, limit: 1 },
  );

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    user,
    userId,
    appsettings,
  };
})(Store);

export default DynamicStore;

Store.defaultProps = {
  authenticated: false,
  loading: true,
  loggingIn: false,
  userId: undefined,
  user: {},
  appsettings: {},
};

Store.propTypes = {
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
  loggingIn: PropTypes.bool,
  userId: PropTypes.string,
  user: PropTypes.objectOf(PropTypes.any),
  appsettings: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.element.isRequired,
};
