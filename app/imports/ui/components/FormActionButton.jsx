import { Divider, IconButton } from '@mui/material';
import { i18n } from 'meteor/universe:i18n';
import React, { useContext, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { toggleActiveForm, copyUrlToClipBoard, hasNotAnswers, hasAlreadyRespond } from '../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { UserContext } from '../contexts/UserContext';
import ModalDeleteConfirmation from './modals/ModalDeleteConfirmation';

export const FormActionButton = ({ deleteForm, currentForm }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(currentForm.active);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { user } = useContext(UserContext);

  const activeForm = () => {
    setActive(!active);
    toggleActiveForm(currentForm);
  };

  const handleDeleteForm = () => {
    setOpenDeleteModal(true);
  };

  const alreadyRespond = () => {
    return !currentForm?.editableAnswers && hasAlreadyRespond(user, currentForm);
  };

  return (
    <div className="flex flex-1">
      <IconButton
        title={
          active ? i18n.__('component.formActionButton.isActive') : i18n.__('component.formActionButton.isNotActive')
        }
        className={active ? 'color-green' : 'color-salmon'}
        onClick={() => activeForm()}
      >
        {active ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.answer')}
        className="color-black"
        disabled={hasNotAnswers(currentForm)}
        onClick={() => navigate(`/answers/${currentForm._id}`)}
      >
        <ListAltIcon />
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.editAnswers')}
        className="color-black"
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
        className="color-black"
        disabled={active || !hasNotAnswers(currentForm)}
        onClick={() => navigate(`/builder/intro/${currentForm._id}`)}
      >
        <DesignServicesIcon />
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.deleteForm')}
        className="color-salmon"
        onClick={() => handleDeleteForm()}
      >
        <DeleteIcon />
      </IconButton>
      {openDeleteModal ? (
        <ModalDeleteConfirmation
          deleteForm={deleteForm}
          form={currentForm}
          open={openDeleteModal}
          onClose={() => {
            setOpenDeleteModal(false);
          }}
        />
      ) : null}
    </div>
  );
};
