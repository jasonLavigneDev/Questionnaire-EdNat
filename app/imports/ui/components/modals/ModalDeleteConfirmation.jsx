import React from 'react';
import i18n from 'meteor/universe:i18n';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  p: 4,
};

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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {i18n.__('component.modalDeleteConfirmation.title')}
        </Typography>

        <Typography sx={{ mt: 2 }}>{i18n.__('component.modalDeleteConfirmation.desc')}</Typography>

        <div style={{ display: 'flex', marginTop: '2vh', justifyContent: 'space-between' }}>
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
