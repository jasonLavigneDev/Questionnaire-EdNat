import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FormContext } from '../../contexts/FormContext';
import { UserContext } from '../../contexts/UserContext';

export const FormInfos = () => {
  const { form, setForm } = useContext(FormContext);
  const { user, setUser } = useContext(UserContext);
  const { groups, setGroups } = useState([]);
  const { currentGroup, setCurrentGroup } = useState({});

  const getGroups = async () => {
    Meteor.callAsync('groups.getUserGroups')
      .then((res) => {
        setGroups(res);
      })
      .catch((err) => {
        console.log('groups.getUserGroups', err.reason);
      });
  };

  useEffect(() => {
    if (user) {
      getGroups();
    }
  }, [user]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="formTitle"
        label="Titre"
        variant="outlined"
        value={form.title}
        helperText="Entrez votre titre"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <TextField
        id="formDescription"
        label="Description"
        variant="outlined"
        value={form.description}
        helperText="Entrez votre description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      {groups ? (
        <FormControl fullWidth>
          <InputLabel id="selectInput-Groups">Choix groupe</InputLabel>
          <Select
            labelId="selectInput-Groups"
            value={currentGroup}
            onChange={(event) => {
              setCurrentGroup(event.target.value);
            }}
          >
            {groups.map((group) => (
              <MenuItem key={group._id} value={group.name}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={form.public} onChange={() => setForm({ ...form, public: !form.public })} name="public" />
          }
          label="Formulaire public"
        />
      </FormGroup>
    </div>
  );
};
