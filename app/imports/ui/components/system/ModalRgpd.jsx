import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleAcceptRGPD } from '../../redux/slices/formSlice';

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

const ModalRgpd = ({ answerMode = false }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);

  const dispatch = useDispatch();

  const handleAccept = () => {
    setOpenModal(false);
    !answerMode && dispatch(toggleAcceptRGPD({ acceptRGPD: true }));
  };

  const handleReject = () => {
    navigate('/');
  };

  return (
    <Modal open={openModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          매개 변수
        </Typography>
        {answerMode ? (
          <Typography sx={{ mt: 2 }}>
            資氣山而。輕上此研來，在草人企李源火面我回光了系連識的代了裡建作的功南的好我電己我習紀很用灣，年人技消可片夜變華我是人此境家你示在很表經主受生問裡。開葉麼無個根位庭且他麼縣了理空。加著來下子立響頭，散定現年下：怕大多，家不我日解女……高入教孩小只你來地真光院處花。發嚴數天不，的用見風……學空時片不。
            才區得員後思就麗以及題親然查完生里以時離過那學演回找的那，都後結們房沒士；點樣原他收口龍信半社地我提青問統力半，子不很管聲你人政車定國精念言定別好次……流小心我什形發服關動要流口陽世沒生企、院戰臺次滿低、消元省會問於的可史那分！
            如大度他工它代是學意如倒研。
            朋所樂……以得半向標喜量母老去供幾快子，是邊營，他模建該兒此字是、中可參直細許策期。通然的里難部通故要、可水得無型的頭經打人技。得年從能內大表時力學，病氣從了不是個，著發會在應作她時什年才人員為已，委究日要心個北演智這命真樂同感最他上智要已後。
          </Typography>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            매개 변수는 첫번째 항목이 문단 수(자동값 1)를, 두번째 항목이 로렘 입숨 텍스트의 앞에 올 문자를, 세번째
            항복이 로렘 입숨 텍스트의 뒤에 올 문자를 지정합니다. 문단은 최대 10개까지 지정할 수 있고, 10개를 넘으면 그
            밑에 첫번째 문단부터 다시 반복되어 나타납니다. 다만, 10을 넘기는 경우에는 틀을 두번 사용하는 것이 더
            낫습니다(재귀 호출로 다시 불러오게 됩니다).
          </Typography>
        )}
        <div style={{ display: 'flex', marginTop: '2vh', justifyContent: 'space-between' }}>
          <Button onClick={handleReject}>{i18n.__('component.modalRgpd.refuse')}</Button>
          <Button onClick={handleAccept}>{i18n.__('component.modalRgpd.accept')}</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalRgpd;
