import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAppContext } from '../contexts/context';
import Spinner from '../components/system/Spinner';

const useStyles = makeStyles(() => ({
  wrapper: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const NotLoggedIn = () => {
  const classes = useStyles();
  const [{ loggingIn, loading }] = useAppContext();

  useEffect(() => {
    if (!loading && !loggingIn) {
      Meteor.loginWithKeycloak();
    }
  }, [loading, loggingIn]);

  return (
    <div className={classes.wrapper}>
      <Spinner />
    </div>
  );
};

export const notLoggedInRoute = {
  path: '/signin',
  element: <NotLoggedIn />,
};
