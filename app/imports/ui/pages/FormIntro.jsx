import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { FormInfos } from '../components/form/FormInfos';
import { Breadcrumb } from '../components/system/Breadcrumb';
import { Footer } from '../components/system/Footer';
import { FormContext } from '../contexts/FormContext';
import { useLoaderData } from 'react-router-dom';

export const FormIntro = () => {
  const { setCurrentForm } = useContext(FormContext);
  const { formFromBDD, userGroups } = useLoaderData();

  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/builder/components`);
  };

  useEffect(() => {
    setCurrentForm(formFromBDD);
  }, []);

  return (
    <>
      <Breadcrumb />
      <FormInfos userGroups={userGroups} />
      <Footer text="Passer a l etape suivante" nextStep={navigateTo} />
    </>
  );
};

export const loader = async ({ params }) => {
  const formFromBDD = (await Meteor.callAsync('forms.getOneFromUser', params.id)) || null;
  const userGroups = await Meteor.callAsync('groups.getUserGroups');

  return { formFromBDD, userGroups } || null;
};
