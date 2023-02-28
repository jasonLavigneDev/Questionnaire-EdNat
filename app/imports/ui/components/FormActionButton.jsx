import { Divider, IconButton } from '@mui/material';
import { i18n } from 'meteor/universe:i18n';
import React, { useContext, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { toggleActiveForm, copyUrlToClipBoard, hasNotAnswers } from '../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { UserContext } from '../contexts/UserContext';

export const FormActionButton = ({ deleteForm, currentForm }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(currentForm.active);
  const { user } = useContext(UserContext);

  const activeForm = () => {
    setActive(!active);
    toggleActiveForm(currentForm);
  };

  const alreadyRespond = () => {
    let userAnswers = currentForm.formAnswers?.find((answer) => answer.userId === user._id);
    return !currentForm?.editableAnswers && userAnswers;
  };

  return (
    <div style={{ flexDirection: 'column', flex: 1 }}>
      <IconButton
        title={
          active ? i18n.__('component.formActionButton.isActive') : i18n.__('component.formActionButton.isNotActive')
        }
        sx={active ? { color: 'lightGreen' } : { color: 'salmon' }}
        onClick={() => activeForm()}
      >
        {active ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
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
        disabled={!active || alreadyRespond()}
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
        disabled={active || !hasNotAnswers(currentForm)}
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
    </div>
  );
};
