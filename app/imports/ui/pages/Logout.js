import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ROUTES from '../layouts/routes';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    Meteor.logout(() => {
      history.replace(ROUTES.LOGIN);
    });
  }, []);

  return null;
};

export default Logout;
