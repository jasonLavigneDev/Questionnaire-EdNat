import { Divider, IconButton } from '@mui/material';
import React from 'react';
import { i18n } from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { copyUrlToClipBoard, hasNotAnswers } from '../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const FormActionButton = ({ deleteForm, currentForm }) => {
  const navigate = useNavigate();

  return (
    <div style={{ flexDirection: 'column', flex: 1 }}>
      <IconButton
        title={i18n.__('component.formActionButton.answer')}
        sx={{ color: 'lightGreen' }}
        disabled={hasNotAnswers(currentForm)}
        onClick={() => navigate(`/answers/${currentForm._id}`)}
      >
        <ListAltIcon />
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.editAnswers')}
        sx={{ color: 'gold' }}
        onClick={() => navigate(`/visualizer/${currentForm._id}`)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.copyUrl')}
        onClick={() => copyUrlToClipBoard(currentForm._id)}
      >
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.editForm')}
        sx={{ color: 'lightBlue' }}
        onClick={() => navigate(`/builder/intro/${currentForm._id}`)}
      >
        <DesignServicesIcon />
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.deleteForm')}
        sx={{ color: 'salmon' }}
        onClick={() => deleteForm(currentForm)}
      >
        <DeleteIcon />
      </IconButton>
      <Divider />
    </div>
  );
};
