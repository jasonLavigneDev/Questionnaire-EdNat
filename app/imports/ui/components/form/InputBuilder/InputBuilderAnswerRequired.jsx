import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import i18n from 'meteor/universe:i18n';

export const InputBuilderAnswerRequired = () => {
  return (
    <Tooltip title={i18n.__('component.inputBuilder.inputRequired')}>
      <Typography sx={{ marginLeft: 0.5 }} color="red" variant="h4">
        *
      </Typography>
    </Tooltip>
  );
};
