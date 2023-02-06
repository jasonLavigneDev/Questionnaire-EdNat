import React, { useState } from 'react';
import FormInfoInputs from '../FormInfoInputs';
import { DisplayGroups } from '../DisplayGroups';
import SelectGroups from '../SelectGroups';

export const FormInfos = ({ userGroups }) => {
  const [isOnlyForGroup, setIsOnlyForGroup] = useState(false); // Remonter cet état au form context

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FormInfoInputs isOnlyForGroup={isOnlyForGroup} setIsOnlyForGroup={setIsOnlyForGroup} />
      {isOnlyForGroup && <SelectGroups />}
      <DisplayGroups userGroups={userGroups} />
    </div>
  );
};
