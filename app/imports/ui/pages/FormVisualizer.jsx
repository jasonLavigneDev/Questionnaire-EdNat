import React, { useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { GlobalStateContext } from '../contexts/GlobalStateContext';

export const FormVisualizer = () => {
  const formFromBDD = useLoaderData();
  const { form, setForm, user } = useContext(GlobalStateContext);
  const navigate = useNavigate();

  const hasAlreadyRespond = () => {
    if (!form.formAnswers || form.formAnswers.length === 0) return false;
    const { formAnswers } = form;
    return !!formAnswers.find((answer) => answer.userId === user.username);
  };

  const handleRedirect = () => {
    navigate('/');
  };

  useEffect(() => {
    setForm(formFromBDD);
  }, []);

  return (
    <div>
      {form ? (
        hasAlreadyRespond() ? (
          handleRedirect()
        ) : (
          <div>
            <Visualizer answerMode={true} completeForm={form} />
          </div>
        )
      ) : (
        <p>Ce formulaire n'existe pas</p>
      )}
    </div>
  );
};

export const loaderVisualizer = async ({ params }) => {
  return await Meteor.callAsync('forms.getOne', params.id);
};
