import { Divider, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../contexts/FormContext';
import { copyUrlToClipBoard, hasNotAnswers } from '../utils/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const FormActionButton = ({ currentForm }) => {
  const { deleteForm } = useContext(FormContext);
  const navigate = useNavigate();

  return (
    <div style={{ flexDirection: 'column', flex: 1 }}>
      <IconButton
        title="Répondre"
        sx={{ color: 'lightGreen' }}
        disabled={hasNotAnswers(currentForm)}
        onClick={() => navigate(`/answers/${currentForm._id}`)}
      >
        <ListAltIcon />
      </IconButton>
      <IconButton
        title="Editez vos réponses"
        sx={{ color: 'gold' }}
        onClick={() => navigate(`/visualizer/${currentForm._id}`)}
      >
        <EditIcon />
      </IconButton>
      <IconButton title="Copier l'URL" onClick={() => copyUrlToClipBoard(currentForm._id)}>
        <ContentCopyIcon />
      </IconButton>
      <IconButton
        title="Editer le formulaire"
        sx={{ color: 'lightBlue' }}
        onClick={() => navigate(`/builder/intro/${currentForm._id}`)}
      >
        <DesignServicesIcon />
      </IconButton>
      <IconButton title="Supprimer le formulaire" sx={{ color: 'salmon' }} onClick={() => deleteForm(currentForm)}>
        <DeleteIcon />
      </IconButton>
      <Divider />
    </div>
  );
};
