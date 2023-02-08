import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useState } from 'react';
import { FormContext } from '../contexts/FormContext';

export default function SelectGroups({ userGroups }) {
  const [groupSelected, setGroupSelected] = useState({});
  const { currentForm, setCurrentForm } = useContext(FormContext);

  const displayGroupsNotSelected = () => {
    return userGroups.filter((group) => currentForm.groups.findIndex((groupId) => groupId === group._id) === -1);
  };

  const selectGroup = (value) => {
    const index = userGroups.findIndex((group) => group.name === value);
    if (index !== -1) return setGroupSelected(userGroups[index]);
  };

  const addGroup = () => {
    if (groupSelected) {
      setCurrentForm({ ...currentForm, groups: [...currentForm.groups, groupSelected._id] });
      setGroupSelected({});
    }
  };

  const haveNotGroup = !userGroups || userGroups.length <= 0;

  if (haveNotGroup) return <p>Vous n'appartenez à aucun groupe</p>;

  return (
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
  );
}
