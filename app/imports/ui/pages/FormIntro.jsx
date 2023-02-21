import React, { useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { DisplayGroups } from '../components/DisplayGroups';
import SelectGroups from '../components/SelectGroups';
import FormInfoInputs from '../components/FormInfoInputs';
import ModalRgpd from '../components/system/ModalRgpd';
import { useDispatch, useSelector } from 'react-redux';
import { fillForm } from '../redux/slices/formSlice';

export const FormIntro = () => {
  const acceptRgpd = useSelector((state) => state.form.acceptRGPD);
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
      dispatch(fillForm(formFromBDD));
    }
  }, []);

  return (
    <>
      {acceptRgpd || formId ? (
        <>
          <Breadcrumb />
          <div className="flex center column">
            <Paper className="flex column pad-20 wd-80pct">
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
