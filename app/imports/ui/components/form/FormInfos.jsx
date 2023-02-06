import { FormControl, InputLabel, IconButton, MenuItem, Select, Button } from '@mui/material';
import React, { useContext, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { FormContext } from '../../contexts/FormContext';
import FormInfoInputs from '../FormInfoInputs';

export const FormInfos = ({ userGroups }) => {
  const [groupSelected, setGroupSelected] = useState({});
  const [isOnlyForGroup, setIsOnlyForGroup] = useState(false); // Remonter cet état au form context

  const { currentForm, setCurrentForm } = useContext(FormContext);

  const displayGroupsNotSelected = () => {
    return userGroups.filter((group) => currentForm.groups.findIndex((groupId) => groupId === group._id) === -1);
  };

  const selectGroup = (value) => {
    const index = userGroups.findIndex((group) => group.name === value);
    if (index === -1) {
      return;
    }

    setGroupSelected(userGroups[index]);
  };

  const getGroupName = (id) => {
    const index = userGroups.findIndex((group) => group._id === id);
    if (index !== -1) {
      return userGroups[index].name;
    }
    return 'N/A';
  };

  const addGroup = () => {
    if (groupSelected) {
      setCurrentForm({ ...currentForm, groups: [...currentForm.groups, groupSelected._id] });
      setGroupSelected({});
    }
  };

  const removeGroup = (id) => {
    const { groups } = currentForm;
    setCurrentForm({ ...currentForm, groups: groups.filter((groupId) => groupId !== id) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <FormInfoInputs isOnlyForGroup={isOnlyForGroup} setIsOnlyForGroup={setIsOnlyForGroup} />
      {isOnlyForGroup &&
        (userGroups.length > 0 ? (
          <div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormControl>
                <InputLabel id="selectInput-Groups">Choix du groupe</InputLabel>
                <Select
                  labelId="selectInput-Groups"
                  value={groupSelected.name}
                  onChange={(event) => {
                    selectGroup(event.target.value);
                  }}
                >
                  {displayGroupsNotSelected().map((group) => (
                    <MenuItem key={group._id} value={group.name}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={() => addGroup()}>Ajouter le groupe</Button>
            </div>
          </div>
        ) : (
          <p>Vous n'appartenez à aucun groupe</p>
        ))}

      <div>
        {currentForm.groups.map((id) => (
          <div style={{ display: 'flex' }}>
            <p>{getGroupName(id)}</p>
            <IconButton sx={{ color: 'salmon' }} onClick={() => removeGroup(id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};
