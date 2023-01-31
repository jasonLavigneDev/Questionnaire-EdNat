import { Button, Divider, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';
import { hasAlreadyRespond } from '../utils/utils';

import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { charCountState, textState, toLowerCase, toUpperCase } from '../recoil/testRecoil';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const [forms, setForms] = useState([]);

  // Jeu de test pour recoil
  // un atom textState qui prend la valeur de l'input user grace au onChange
  // une fonction setTextUpper , qui vient du selector toUpperCase, qui récupère la valeur de l'atom textState et qui le transforme en uppercase au clique sur le bouton
  // une fonction setTextLower , qui vient du selector toLowerCase, qui récupère la valeur de l'atom textState et qui le transforme en uppercase au clique sur le bouton
  // une fonction count , qui récupère la valeur de l'atome textState , qui calcule le nombre de caractere et le retourne.

  const [text, setText] = useRecoilState(textState);
  const onChange = (event) => {
    setText(event.target.value);
  };
  const setTextUpper = useSetRecoilState(toUpperCase);
  const setTextLower = useSetRecoilState(toLowerCase);

  const count = useRecoilValue(charCountState);
  // Fin du jeu de test pour recoil

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

  useEffect(() => {
    resetFormContext();
  }, []);

  return (
    <>
      <div id="test-de-recoil-pour-exemple-a-supprimer-ensuite">
        <input type="text" value={text} onChange={onChange} />
        <p>{text}</p>
        <p>{count}</p>
        <button onClick={() => setTextUpper(text)}>ToUpper</button>
        <button onClick={() => setTextLower(text)}>toLower</button>
      </div>
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
                  <div style={{ flexDirection: 'column' }}>
                    <Typography variant="body1">{form.title}</Typography>
                  </div>
                  <div style={{ flexDirection: 'column' }}>
                    <Button disabled={hasNotAnswers(form._id)} onClick={() => navigate(`/answers/${form._id}`)}>
                      Voir les reponses{' '}
                    </Button>
                    <Button onClick={() => navigate(`/visualizer/${form._id}`)}>
                      {hasAlreadyRespond(user, form) ? 'Modifier les réponses' : 'Répondre au formulaire'}
                    </Button>
                    <Button onClick={() => navigate(`/builder/intro/${form._id}`)}>Editer ce formulaire</Button>
                    <Button onClick={() => handleDelete(form)}>Supprimer ce formulaire</Button>
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
