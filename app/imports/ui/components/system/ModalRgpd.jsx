import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAcceptRGPD } from '../../redux/slices/formSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  borderRadius: 5,
  p: 4,
};

const ModalRgpd = ({ answerMode = false, reminder = false }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(true);
  const { firstName, lastName } = useSelector((state) => state.form);

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
          {reminder ? i18n.__('component.rgpd.reminder') : i18n.__('component.rgpd.acceptation')}
        </Typography>
        {answerMode ? (
          <Typography sx={{ mt: 2 }}>
            Les informations recueillies sur ce formulaire sont enregistrées dans un fichier informatisé par
            <b> {firstName + ' ' + lastName}</b> pour <b>consultation et analyse</b>.
            <br /> La base légale du traitement est <b>le consentement</b>.
            <br /> Les données collectées seront communiquées aux seuls destinataires suivants :
            <b> {firstName + ' ' + lastName}</b>.
            <br />
            Les données sont conservées pendant <b>30 jours</b>.
            <br />
            Vous pouvez accéder aux données vous concernant, les rectifier, demander leur effacement ou exercer votre
            droit à la limitation du traitement de vos données.
            <br />
            Vous pouvez également vous opposer au traitement de vos données.
            <br />
            Vous pouvez également exercer votre droit à la portabilité de vos données. Consultez le site de la{' '}
            <a href="https://cnil.fr" target="_blank" rel="noopener noreferrer">
              CNIL
            </a>{' '}
            pour plus d’informations sur vos droits.
            <br /> Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif,
            vous pouvez contacter :<br />
            <b>
              Le délégué à la protection des données de votre académie{' '}
              <a
                href="https://www.education.gouv.fr/les-enjeux-de-la-protection-des-donnees-au-sein-de-l-education-7451"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.education.gouv.fr
              </a>{' '}
            </b>
            <br />
            Si vous estimez, après nous avoir contactés, que vos droits « Informatique et Libertés » ne sont pas
            respectés, vous pouvez adresser une réclamation à la CNIL.
            <br />
            NB : En cas de refus il vous sera impossible d&apos;accéder au questionnaire.
          </Typography>
        ) : reminder ? (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Vous vous apprêtez à créer un formulaire depuis un formulaire existant, où des données saisies par des
            utilisateurs sont recueillies et stockées. Ce nouveau formulaire{' '}
            <b>ne contient pas les données du formulaire initial</b>.
            <br />
            Au même titre que précédemment, vous devenez <b>responsable des données collectées</b>
            et vous engagez à <b>respecter les règles</b> concernant les droits des répondants. <br />
            Vous vous engagez donc à : <br />
            - n&apos;utiliser ces données que dans le cadre de l&apos;application (consultation et analyse)
            <br />- supprimer ces données au bout de <b>30 jours</b> suivant la fin d&apos;activité du formulaire
            <br />- accéder aux demandes des utilisateurs concernant{' '}
            <b>la rectification, l&apos;effacement ou la limitation du traitement de ces données</b>
            <br />- ne demander que des informations nécessaires <b>non personnelles</b>. Certains sujets sont
            préjudiciables et donc à proscrire (religion, orientation sexuelle, convictions politiques...) <br />
            <br />
            Pour toutes informations complémentaires concernant le <b>droit des utilisateurs</b>, vous pouvez vous
            référer au site de la{' '}
            <a href="https://cnil.fr" target="_blank" rel="noopener noreferrer">
              CNIL
            </a>
            .
          </Typography>
        ) : (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Vous vous apprêtez à créer un formulaire où des données saisies par des utilisateurs sont recueillies et
            stockées.
            <br />
            De ce fait, vous devenez <b>responsable des données collectées</b> et vous engagez à{' '}
            <b>respecter les règles</b> concernant les droits des répondants. <br />
            Vous vous engagez donc à : <br />
            - n&apos;utiliser ces données que dans le cadre de l&apos;application (consultation et analyse)
            <br />- supprimer ces données au bout de <b>30 jours</b> suivant la fin d&apos;activité du formulaire
            <br />- accéder aux demandes des utilisateurs concernant{' '}
            <b>la rectification, l&apos;effacement ou la limitation du traitement de ces données</b>
            <br />- ne demander que des informations nécessaires <b>non personnelles</b>. Certains sujets sont
            préjudiciables et donc à proscrire (religion, orientation sexuelle, convictions politiques...) <br />
            <br />
            Pour toutes informations complémentaires concernant le <b>droit des utilisateurs</b>, vous pouvez vous
            référer au site de la{' '}
            <a href="https://cnil.fr" target="_blank" rel="noopener noreferrer">
              CNIL
            </a>
            .
          </Typography>
        )}
        <div style={{ display: 'flex', marginTop: '2vh', justifyContent: 'space-between' }}>
          {reminder ? (
            <Button variant="contained" onClick={handleAccept}>
              {i18n.__('component.modalRgpd.continue')}
            </Button>
          ) : (
            <>
              <Button variant="contained" onClick={handleReject}>
                {i18n.__('component.modalRgpd.refuse')}
              </Button>
              <Button variant="contained" onClick={handleAccept}>
                {i18n.__('component.modalRgpd.accept')}
              </Button>
            </>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ModalRgpd;
