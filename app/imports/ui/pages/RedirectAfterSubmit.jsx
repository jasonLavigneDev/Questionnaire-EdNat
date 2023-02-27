import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import i18n from 'meteor/universe:i18n';

const flexCenterStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  alignItems: 'center',
};

const RedirectSubmitPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div style={flexCenterStyle}>
      <h1 style={{ display: 'flex' }}>
        {i18n.__('page.redirectPage.title')}
        <CheckCircleIcon fontSize="large" sx={{ color: 'green', marginLeft: '1vw' }} />
      </h1>
      <p>
        <i>
          {i18n.__('page.redirectPage.subTitle')} {count}
        </i>
      </p>
    </div>
  );
};

export default RedirectSubmitPage;
