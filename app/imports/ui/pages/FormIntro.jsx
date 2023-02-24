import React, { useContext, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { FormContext } from '../contexts/FormContext';
import { DisplayGroups } from '../components/DisplayGroups';
import SelectGroups from '../components/SelectGroups';
import FormInfoInputs from '../components/FormInfoInputs';
import ModalRgpd from '../components/system/ModalRgpd';
import { useDispatch, useSelector } from 'react-redux';
import { fillForm } from '../redux/slices/formSlice';

export const FormIntro = () => {
  const { acceptRgpd } = useContext(FormContext);
  const { formFromBDD, userGroups } = useLoaderData();
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/builder/components`);
  };
  const dispatch = useDispatch();
  const isFormGroup = useSelector((state) => state.form.isForGroup);
  const formId = useSelector((state) => state.form.formId);

  useEffect(() => {
    if (formFromBDD) {
      const { title, desc, components, groups, _id, isPublic, formAnswers } = formFromBDD;
      if (formAnswers && formAnswers.length) {
        formAnswers.forEach((answer) => {
          delete answer.createdAt;
        });
      }
      const onlyGroup = !!formFromBDD.groups.length;

      const fieldForPopulateState = {
        title,
        desc,
        components,
        groups,
        isPublic,
        formId: _id,
        formAnswers,
        onlyGroup,
      };

      dispatch(fillForm(fieldForPopulateState));
    }
  }, []);

  return (
    <>
      {acceptRgpd || formId ? (
        <>
          <Breadcrumb />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper style={{ display: 'flex', flexDirection: 'column', padding: 20, width: '80%' }}>
              <FormInfoInputs />
              {isFormGroup && (
                <>
                  <SelectGroups userGroups={userGroups} />
                  <DisplayGroups userGroups={userGroups} />
                </>
              )}
            </Paper>
          </div>
          <Footer text={i18n.__('page.formIntro.goNext')} nextStep={navigateTo} />
        </>
      ) : (
        <ModalRgpd />
      )}
    </>
  );
};

export const loader = async ({ params }) => {
  const formFromBDD = (await Meteor.callAsync('forms.getOneFromUser', params.id)) || null;
  const userGroups = (await Meteor.callAsync('groups.getUserGroups')) || null;

  return { formFromBDD, userGroups } || null;
};
