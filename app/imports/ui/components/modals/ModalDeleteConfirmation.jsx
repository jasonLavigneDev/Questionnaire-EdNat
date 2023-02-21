import React from 'react';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const ModalDeleteConfirmation = ({ deleteForm, form, open, onClose }) => {
  const handleDeleteForm = async () => {
    deleteForm(form);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modalDeleteConfirmation">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {i18n.__('component.modalDeleteConfirmation.title')}
        </Typography>

        <Typography className="mt-2">{i18n.__('component.modalDeleteConfirmation.desc')}</Typography>

        <div className="flex mt-2 jc-spaceb">
          <Button variant="contained" onClick={() => handleCancel()}>
            {i18n.__('component.modalDeleteConfirmation.cancel')}
          </Button>
          <Button variant="contained" onClick={() => handleDeleteForm()}>
            {i18n.__('component.modalDeleteConfirmation.confirm')}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDeleteConfirmation;
