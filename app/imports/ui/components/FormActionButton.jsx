import { IconButton } from '@mui/material';
import { i18n } from 'meteor/universe:i18n';
import React, { useContext, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import {
  toggleActiveForm,
  copyUrlToClipBoard,
  hasNotAnswers,
  expirationDateIsPassed,
  hasAlreadyRespond,
} from '../utils/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Slide from '@mui/material/Slide';
import { UserContext } from '../contexts/UserContext';
import ModalDeleteConfirmation from './modals/ModalDeleteConfirmation';

export const FormActionButton = ({ deleteForm, currentForm }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(currentForm.active);
  const [open, setOpen] = useState(false);
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

  const handleCopyClipboard = (id) => {
    copyUrlToClipBoard(id);
    setOpen(true);
  };

  return (
    <div style={{ flexDirection: 'column', flex: 1 }}>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
          sx={{ marginTop: '5vh' }}
        >
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            {i18n.__('component.formActionButton.copyUrlSuccess')}
          </Alert>
        </Snackbar>
      )}
      <IconButton
        title={
          active ? i18n.__('component.formActionButton.isActive') : i18n.__('component.formActionButton.isNotActive')
        }
        disabled={expirationDateIsPassed(currentForm)}
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
        disabled={!active || alreadyRespond() || expirationDateIsPassed(currentForm)}
        onClick={() => navigate(`/visualizer/${currentForm._id}`)}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        title={i18n.__('component.formActionButton.copyUrl')}
        onClick={() => handleCopyClipboard(currentForm._id)}
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
