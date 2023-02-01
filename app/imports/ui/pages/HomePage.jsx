import { Button, Divider, Typography, IconButton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';
import { hasAlreadyRespond } from '../utils/utils';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Edit from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const [forms, setForms] = useState([]);

  const getForms = async () => {
    Meteor.callAsync('forms.getUserForms')
      .then((res) => {
        setForms(res);
      })
      .catch((err) => {
        console.log('forms.getUserForms', err.reason);
      });
  };

  useEffect(() => {
    if (user) {
      getForms();
    }
  }, [user]);

  const hasNotAnswers = (formId) => {
    const form = forms.find((form) => form._id === formId);
    if (!form.formAnswers || form.formAnswers.length === 0) return true;
    return false;
  };

  const handleDelete = async (form) => {
    console.log(form);
    await Meteor.callAsync('forms.deleteForm', { id: form._id });
    setForms(forms.filter((f) => f._id !== form._id));
  };
  const navigate = useNavigate();

  const { resetFormContext } = useContext(FormContext);

  const copyUrlToClipBoard = (id) => {
    const url = `http://localhost:3060/visualizer/${id}`;
    console.log('url copy to ClipBoard', url);
    return navigator.clipboard.writeText(url);
  };

  useEffect(() => {
    resetFormContext();
  }, []);

  return (
    <>
      {user ? (
        <>
          <div style={{ textAlign: 'center' }}>
            <Button size="large" onClick={() => navigate('/builder/intro')}>
              Nouveau questionnaire
            </Button>
          </div>
          <div>
            <h2>Liste de vos questionnaires</h2>
            <div>
              {forms.map((form) => (
                <div
                  key={form._id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ flexDirection: 'column', flex: 3 }}>
                    <Typography variant="body1">{form.title}</Typography>
                  </div>
                  <div style={{ flexDirection: 'column', flex: 1 }}>
                    <IconButton
                      title="Répondre"
                      sx={{ color: 'lightGreen' }}
                      disabled={hasNotAnswers(form._id)}
                      onClick={() => navigate(`/answers/${form._id}`)}
                    >
                      <ListAltIcon />
                    </IconButton>
                    <IconButton
                      title="Editez vos réponses"
                      sx={{ color: 'gold' }}
                      onClick={() => navigate(`/visualizer/${form._id}`)}
                    >
                      {/* {hasAlreadyRespond(user, form) ? 'Modifier les réponses' : 'Répondre au formulaire'} */}
                      <EditIcon />
                    </IconButton>
                    <IconButton title="Copier l'URL" onClick={() => copyUrlToClipBoard(form._id)}>
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton
                      title="Editer le formulaire"
                      sx={{ color: 'lightBlue' }}
                      onClick={() => navigate(`/builder/intro/${form._id}`)}
                    >
                      <DesignServicesIcon />
                    </IconButton>
                    <IconButton
                      title="Supprimer le formulaire"
                      sx={{ color: 'salmon' }}
                      onClick={() => handleDelete(form)}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <Divider />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </>
  );
};
