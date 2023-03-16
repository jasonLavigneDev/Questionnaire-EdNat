import React from 'react';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(() => ({
  divContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    marginTop: '10vh',
    border: 'rgba(255, 0, 0, 0.7) solid 5px',
    borderRadius: '15px',
    margin: 'auto',
    padding: 30,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  paragraph: {
    textAlign: 'center',
  },
}));

export default function SiteInMaintenance({ appsettings }) {
  const classes = useStyle();
  return (
    <>
      <div className={classes.divContainer}>
        <Typography className={classes.title} variant="h5" color="inherit">
          {i18n.__('component.SiteInMaintenance.maintenanceInProgress')}
        </Typography>

        <Typography className={classes.paragraph} color="inherit">
          {appsettings.textMaintenance}
        </Typography>
      </div>
    </>
  );
}
