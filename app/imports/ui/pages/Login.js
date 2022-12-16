import React from 'react';
import { useHistory } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useAppContext } from '../contexts/context';
import ROUTES from '../layouts/routes';

const useStyles = makeStyles(() => ({
  wrapper: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [{ loggingIn }] = useAppContext();
  const history = useHistory();

  return (
    <div className={classes.wrapper}>
      <Button variant="contained" color="primary" onClick={() => history.replace(ROUTES.HOME)}>
        {i18n.__(loggingIn ? 'system.loading' : 'system.login')}
      </Button>
    </div>
  );
};

export default Login;
