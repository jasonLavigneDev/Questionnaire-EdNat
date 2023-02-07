import React, { useContext, useState } from 'react';
import FormInfoInputs from '../FormInfoInputs';
import { DisplayGroups } from '../DisplayGroups';
import SelectGroups from '../SelectGroups';
import { FormContext } from '../../contexts/FormContext';

export const FormInfos = ({ userGroups }) => {
  const { currentForm, isOnlyForGroup } = useContext(FormContext);

  const isFormGroup = isOnlyForGroup || currentForm.groups.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FormInfoInputs />
      {isFormGroup && (
        <>
          <SelectGroups userGroups={userGroups} />
          <DisplayGroups userGroups={userGroups} />
        </>
      )}
    </div>
  );
};
