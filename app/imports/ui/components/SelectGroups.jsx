import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
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

  if (haveNotGroup) return <p>{i18n.__('component.selectGroups.noGroup')}</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginTop: '1vh' }}>
      <FormControl>
        <InputLabel id="selectInput-Groups">{i18n.__('component.selectGroups.groupChoice')}</InputLabel>
        <Select
          labelId="selectInput-Groups"
          label="Choix du groupe"
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
      <Button onClick={() => addGroup()}>{i18n.__('component.selectGroups.addGroup')}</Button>
    </div>
  );
}
