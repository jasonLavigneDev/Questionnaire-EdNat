import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  IconButton,
  MenuItem,
  Select,
  Button,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FormContext } from '../../contexts/FormContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../contexts/UserContext';

export const FormInfos = () => {
  const { form, setForm } = useContext(FormContext);
  const { user, setUser } = useContext(UserContext);
  const [userGroups, setUserGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});

  const getGroups = async () => {
    Meteor.callAsync('groups.getUserGroups')
      .then((res) => {
        setUserGroups(res);
      })
      .catch((err) => {
        console.log('groups.getUserGroups', err.reason);
      });
  };

  const filterUserGroups = () => {
    return userGroups.filter((group) => form.groups.findIndex((groupId) => groupId === group._id) === -1);
  };

  const setGroupReserved = () => {
    if (form.groupReserved) {
      setForm({ ...form, isPublic: false });
    }
  };

  const getGroup = (value) => {
    const index = userGroups.findIndex((group) => group.name === value);
    if (index === -1) {
      return;
    }

    setCurrentGroup(userGroups[index]);
  };

  const getGroupName = (id) => {
    const index = userGroups.findIndex((group) => group._id === id);
    if (index !== -1) {
      return userGroups[index].name;
    }
    return 'N/A';
  };

  const addGroupToList = () => {
    if (currentGroup) {
      setForm({ ...form, groups: [...form.groups, currentGroup._id] });
      setCurrentGroup({});
    }
  };

  const removeGroupToAdd = (id) => {
    const { groups } = form;
    setForm({ ...form, groups: groups.filter((groupId) => groupId !== id) });
  };

  const formId = useLoaderData();

  console.log('formId', formId);

  useEffect(() => {
    if (formId) {
      setForm(formId);
    }
    if (form.groups.length !== 0) {
      setGroupReserved(true);
    }
  }, [formId]);

  useEffect(() => {
    getGroups();
    console.log(form);
  }, [form]);

  useEffect(() => {
    if (form.groupReserved) setForm({ ...form, isPublic: false });
    else {
      setForm({ ...form, groups: [] });
      setCurrentGroup({});
    }
    if (form.isPublic) {
      setForm({ ...form, groupReserved: false, groups: [] });
      setCurrentGroup({});
    }
  }, [form.groupReserved, form.isPublic]);

  console.log('form depuis id dans intro', form);

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
        id="formdesc"
        label="description"
        variant="outlined"
        value={form.desc}
        helperText="Entrez votre description"
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.isPublic}
              onChange={() => setForm({ ...form, isPublic: !form.isPublic })}
              name="isPublic"
            />
          }
          label="Formulaire public"
        />
      </FormGroup>
      {!form.isPublic ? (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.groups.length !== 0}
                onChange={() =>
                  setForm({
                    ...form,
                    groupReserved: !form.groupReserved,
                  })
                }
                name="réservé aux groupes"
              />
            }
            label="Réservé aux groupes"
          />
        </FormGroup>
      ) : null}
      {form.groupReserved ? (
        userGroups ? (
          <div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormControl>
                <InputLabel id="selectInput-Groups">Choix du groupe</InputLabel>
                <Select
                  labelId="selectInput-Groups"
                  value={currentGroup.name}
                  onChange={(event) => {
                    getGroup(event.target.value);
                  }}
                >
                  {filterUserGroups().map((group) => (
                    <MenuItem key={group._id} value={group.name}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={() => addGroupToList()}>Ajouter le groupe</Button>
            </div>
          </div>
        ) : (
          <p>Vous n'appartenez à aucun groupe</p>
        )
      ) : null}

      <div>
        {form.groups.map((id) => (
          <div style={{ display: 'flex' }}>
            <p>{getGroupName(id)}</p>
            <IconButton sx={{ color: 'salmon' }} onClick={() => removeGroupToAdd(id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export const loader = async ({ params }) => {
  if (params.id) return await Meteor.callAsync('forms.getOne', params.id);
  return null;
};
