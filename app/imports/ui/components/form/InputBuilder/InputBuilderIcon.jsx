import React from 'react';
import i18n from 'meteor/universe:i18n';
import { Divider, Tooltip } from '@mui/material';
import { LIST_OF_INPUT_BUILDER } from '../../listOfInputBuilder';

export const InputBuilderIcon = ({ currentComponent }) => {
  return LIST_OF_INPUT_BUILDER.map(
    (inputBuilder) =>
      inputBuilder.id === currentComponent.type && (
        <div key={inputBuilder.id} style={{ display: 'flex', justifyContent: 'start' }}>
          <Tooltip title={i18n.__(`component.inputs.${inputBuilder.name}`)}>{inputBuilder.icon}</Tooltip>
          <Divider orientation="vertical" flexItem sx={{ margin: '0 1vw' }} />
        </div>
      ),
  );
};
