import React, { useContext } from 'react';
import i18n from 'meteor/universe:i18n';
import { Modal, Box, Typography, Button } from '@mui/material';
import { FormContext } from '../../contexts/FormContext';
import { useNavigate } from 'react-router-dom';

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

const ModalRgpd = () => {
  const navigate = useNavigate();
  const { setAcceptRgpd } = useContext(FormContext);

  const handleAccept = () => {
    setAcceptRgpd(true);
  };

  const handleReject = () => {
    navigate('/');
  };

  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          매개 변수
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          매개 변수는 첫번째 항목이 문단 수(자동값 1)를, 두번째 항목이 로렘 입숨 텍스트의 앞에 올 문자를, 세번째 항복이
          로렘 입숨 텍스트의 뒤에 올 문자를 지정합니다. 문단은 최대 10개까지 지정할 수 있고, 10개를 넘으면 그 밑에
          첫번째 문단부터 다시 반복되어 나타납니다. 다만, 10을 넘기는 경우에는 틀을 두번 사용하는 것이 더 낫습니다(재귀
          호출로 다시 불러오게 됩니다).
        </Typography>
        <div style={{ display: 'flex', marginTop: '2vh', justifyContent: 'space-between' }}>
          <Button onClick={handleReject}>{i18n.__('component.modalRgpd.refuse')}</Button>
          <Button onClick={handleAccept}>{i18n.__('component.modalRgpd.accept')}</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalRgpd;
