import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import i18n from 'meteor/universe:i18n';
import { useLoaderData } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { UserContext } from '../contexts/UserContext';
import { fillForm } from '../redux/slices/formSlice';
import { fillUserAnswersObject } from '../redux/slices/answerFormSlice';

export const AnswerPage = () => {
  const formFromBDD = useLoaderData();
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const currentFormHasAnswers = !!formFromBDD.formAnswers;

  useEffect(() => {
    if (formFromBDD) {
      const { title, desc, components, groups, isPublic, _id, formAnswers, active } = formFromBDD;
      if (formAnswers && formAnswers.length) {
        formAnswers.forEach((answer) => {
          delete answer.createdAt;
        });
      }
      const fieldForPopulateState = {
        title,
        desc,
        components,
        groups,
        isPublic,
        formId: _id,
        formAnswers,
        isActive: active,
      };

      dispatch(fillForm(fieldForPopulateState));
      if (user && currentFormHasAnswers) {
        let userAnswers = formFromBDD.formAnswers.find((answer) => answer.userId === user._id);
        if (userAnswers) {
          dispatch(
            fillUserAnswersObject({
              userId: userAnswers.userId,
              formId: formFromBDD._id,
              answers: userAnswers.answers,
            }),
          );
        }
      }
    }
  }, []);

  if (!formFromBDD) return <p>{i18n.__('page.answerPage.formNotFound')}</p>;

  return <Visualizer answerMode={true} />;
};

export const loaderVisualizer = async ({ params }) => {
  const userForm = await Meteor.callAsync('forms.getOne', params.id);
  return userForm || null;
};
