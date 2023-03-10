import React, { useEffect, useState } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { DisplayGroups } from '../components/DisplayGroups';
import SelectGroups from '../components/SelectGroups';
import FormInfoInputs from '../components/FormInfoInputs';
import ModalRgpd from '../components/system/ModalRgpd';
import { useDispatch, useSelector } from 'react-redux';
import { fillForm, addGroups, formType } from '../redux/slices/formSlice';

export const FormIntro = () => {
  const acceptRgpd = useSelector((state) => state.form.acceptRGPD);
  const { formFromBDD, userGroups } = useLoaderData();
  const [groups, setGroups] = useState(userGroups || []);

  let [urlSearchParams] = useSearchParams();
  let tokenGiven = urlSearchParams.get('groupId');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/builder/components`);
  };

  const isFormGroup = useSelector((state) => state.form.isForGroup);
  const formId = useSelector((state) => state.form.formId);
  const formGroups = useSelector((state) => state.form.groups);

  const checkGroup = (tokenGiven) => {
    const group = groups.find((gr) => gr._id === tokenGiven);
    if (group) {
      const alreadyInsert = !!formGroups.find((groupId) => groupId === group._id);
      if (!alreadyInsert) {
        dispatch(formType({ name: 'group' }));
        dispatch(addGroups(group._id));
        setGroups(groups.filter((gr) => gr._id != group._id));
      }
    }
  };

  useEffect(() => {
    if (formFromBDD) {
      dispatch(fillForm(formFromBDD));
    }
    if (tokenGiven) {
      checkGroup(tokenGiven);
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
