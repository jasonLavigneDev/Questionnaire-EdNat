import React, { useContext, useEffect } from 'react';
import i18n from 'meteor/universe:i18n';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { FormContext } from '../contexts/FormContext';
import { useLoaderData } from 'react-router-dom';
import { DisplayGroups } from '../components/DisplayGroups';
import SelectGroups from '../components/SelectGroups';
import FormInfoInputs from '../components/FormInfoInputs';
import ModalRgpd from '../components/system/ModalRgpd';

export const FormIntro = () => {
  const { isFormGroup, setCurrentForm, acceptRgpd } = useContext(FormContext);
  const { formFromBDD, userGroups } = useLoaderData();
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate(`/builder/components`);
  };

  useEffect(() => {
    if (formFromBDD) setCurrentForm(formFromBDD);
  }, []);

  return (
    <>
      {acceptRgpd ? (
        <>
          <Breadcrumb />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormInfoInputs isFormGroup={isFormGroup} />
            {isFormGroup && (
              <>
                <SelectGroups userGroups={userGroups} />
                <DisplayGroups userGroups={userGroups} />
              </>
            )}
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
