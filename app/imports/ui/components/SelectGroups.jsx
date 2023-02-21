import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { i18n } from 'meteor/universe:i18n';
import { useDispatch, useSelector } from 'react-redux';
import { addGroups } from '../redux/slices/formSlice';
import { getStrucGroupName } from '../../api/groups/methods';

export default function SelectGroups({ userGroups }) {
  const [groupSelected, setGroupSelected] = useState({});
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);

  const displayGroupsNotSelected = () => {
    return userGroups.filter((group) => form.groups.findIndex((groupId) => groupId === group._id) === -1);
  };

  const selectGroup = (value) => {
    const index = userGroups.findIndex((group) => group.name === value);
    if (index !== -1) return setGroupSelected(userGroups[index]);
  };

  const addGroupToForm = () => {
    if (groupSelected) {
      dispatch(addGroups(groupSelected._id));
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
              {getStrucGroupName(group)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={() => addGroupToForm()}>{i18n.__('component.selectGroups.addGroup')}</Button>
    </div>
  );
}
