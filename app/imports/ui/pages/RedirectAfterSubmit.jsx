import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import { UserContext } from '../contexts/UserContext';

const RedirectSubmitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(5);

  const urlForEdition = location.state?.urlForEdition || '';
  useEffect(() => {
    if (user) {
      if (count > 0) {
        const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
        return () => {
          clearInterval(timer);
        };
      } else {
        navigate('/');
      }
    }
  }, [count]);

  return (
    <div className="flex center column">
      <h1 className="flex">
        {i18n.__('page.redirectPage.title')}
        <CheckCircleIcon fontSize="large" className="color-green ml-1" />
      </h1>
      {urlForEdition && (
        <>
          <p>{i18n.__('page.redirectPage.copyUrl')}</p>
          <Button variant="contained" onClick={() => navigator.clipboard.writeText(urlForEdition)}>
            Copier l'URL
          </Button>
        </>
      )}{' '}
      {user && (
        <p>
          <i>
            {i18n.__('page.redirectPage.subTitle')} {count}
          </i>
        </p>
      )}
    </div>
  );
};

export default RedirectSubmitPage;
