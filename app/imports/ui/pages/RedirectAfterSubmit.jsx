import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Alert, Button, Snackbar, Slide } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import { UserContext } from '../contexts/UserContext';

const flexCenterStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  alignItems: 'center',
};

const RedirectSubmitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [count, setCount] = useState(5);
  const [openAlert, setOpenAlert] = useState(false);

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

  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(urlForEdition);
    setOpenAlert(true);
  };

  return (
    <div style={flexCenterStyle}>
      {openAlert && (
        <Snackbar
          open={openAlert}
          autoHideDuration={5000}
          onClose={() => setOpenAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
          sx={{ marginTop: '5vh' }}
        >
          <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
            {i18n.__('component.formActionButton.copyUrlSuccess')}
          </Alert>
        </Snackbar>
      )}
      <h1 style={{ display: 'flex' }}>
        {i18n.__('page.redirectPage.title')}
        <CheckCircleIcon fontSize="large" sx={{ color: 'green', marginLeft: '1vw' }} />
      </h1>
      {!user && <i>{i18n.__('page.redirectPage.instruction')}</i>}
      {urlForEdition && (
        <>
          <p>{i18n.__('page.redirectPage.copyUrl')}</p>
          <Button variant="contained" onClick={() => handleCopyLinkClick()}>
            {i18n.__('page.redirectPage.copyButton')}
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
