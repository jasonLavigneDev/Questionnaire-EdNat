import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { FormContext } from '../contexts/FormContext';
import { useLoaderData } from 'react-router-dom';

export const FormIntro = () => {
  const { setCurrentForm } = useContext(FormContext);
  const { form, userGroups } = useLoaderData();

  const navigate = useNavigate();

  if (form) setCurrentForm(form);

  const navigateTo = () => {
    navigate(`/builder/components`);
  };

  return (
    <>
      <Breadcrumb />
      <FormInfos userGroups={userGroups} />
      <Footer text="Passer a l etape suivante" nextStep={navigateTo} />
    </>
  );
};

export const loader = async ({ params }) => {
  const form = (await Meteor.callAsync('forms.getOneFromUser', params.id)) || null;
  const userGroups = await Meteor.callAsync('groups.getUserGroups');

  return { form, userGroups } || null;
};
