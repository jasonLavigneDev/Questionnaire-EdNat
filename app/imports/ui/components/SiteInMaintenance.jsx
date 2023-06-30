import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Typography } from '@mui/material';

const divContainer = {
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  marginTop: '10vh',
  border: 'rgba(255, 0, 0, 0.7) solid 5px',
  borderRadius: '15px',
  margin: 'auto',
  padding: 30,
};

const title = {
  display: 'flex',
  justifyContent: 'center',
};

const paragraph = {
  textAlign: 'center',
};

export default function SiteInMaintenance({ appsettings }) {
  return (
    <>
      <div style={divContainer}>
        <Typography className={title} variant="h5" color="inherit">
          {i18n.__('component.SiteInMaintenance.maintenanceInProgress')}
        </Typography>

        <Typography className={paragraph} color="inherit">
          {appsettings.textMaintenance}
        </Typography>
      </div>
    </>
  );
}
