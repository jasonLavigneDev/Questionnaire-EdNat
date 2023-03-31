import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import i18n from 'meteor/universe:i18n';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Visualizer } from '../components/form/Visualizer';
import { UserContext } from '../contexts/UserContext';
import { fillForm } from '../redux/slices/formSlice';
import { fillUserAnswersObject } from '../redux/slices/answerFormSlice';

export const AnswerPage = () => {
  const { formFromBDD, userGroups } = useLoaderData();

  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const [alreadyRespond, setAlreadyRespond] = useState(false);
  const currentFormHasAnswers = !!formFromBDD.formAnswers;

  let [urlSearchParams] = useSearchParams();

  useEffect(() => {
    let tokenGiven = urlSearchParams.get('token');
    if (formFromBDD) {
      const { title, desc, components, owner, groups, editableAnswers, isPublic, _id, formAnswers, active } =
        formFromBDD;

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
        _id,
        formAnswers,
        editableAnswers,
        isActive: active,
        owner,
      };

      dispatch(fillForm(fieldForPopulateState));

      if (currentFormHasAnswers) {
        let userAnswers = null;
        if (user) {
          userAnswers = formFromBDD.formAnswers.find((answer) => answer.userId === user._id) || null;
        } else if (tokenGiven) {
          userAnswers = formFromBDD.formAnswers.find((answer) => answer.modifyAnswersToken === tokenGiven) || null;
        }
        if (userAnswers) {
          // user has already respond to this form => retrieve answers
          setAlreadyRespond(true);
          dispatch(
            fillUserAnswersObject({
              userId: userAnswers.userId,
              formId: formFromBDD._id,
              modifyAnswersToken: userAnswers.modifyAnswersToken,
              answers: userAnswers.answers,
            }),
          );
        }
      }
    }
  }, []);

  const userIsInGroup = () => {
    if (user && userGroups) {
      return userGroups.some((group) => formFromBDD.groups.includes(group._id));
    }
    return false;
  };

  if (!formFromBDD) return <p>{i18n.__('page.answerPage.formNotFound')}</p>;
  if (!formFromBDD.editableAnswers && alreadyRespond) return <p>{i18n.__('page.answerPage.notEditable')}</p>;
  if (formFromBDD.groups.length > 0 && !userIsInGroup()) return <p>{i18n.__('page.answerPage.notInGroup')}</p>;

  return <Visualizer answerMode={true} />;
};

export const loaderVisualizer = async ({ params }) => {
  const formFromBDD = await Meteor.callAsync('forms.getOne', params.id);
  const userGroups = (await Meteor.callAsync('groups.getUserGroups')) || null;
  return { formFromBDD, userGroups } || null;
};
