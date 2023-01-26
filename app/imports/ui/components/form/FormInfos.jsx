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

export const FormInfos = () => {
  const { form, setForm } = useContext(FormContext);
  const [groupOfThisUser, setGroupOfThisUser] = useState([]);
  const [groupSelected, setGroupSelected] = useState({});
  const [isOnlyForGroup, setIsOnlyForGroup] = useState(false);

  const formFromBDD = useLoaderData();

  const getGroups = async () => {
    Meteor.callAsync('groups.getUserGroups')
      .then((res) => {
        setGroupOfThisUser(res);
      })
      .catch((err) => {
        console.log('groups.getUserGroups', err.reason);
      });
  };

  const filterUserGroups = () => {
    return groupOfThisUser.filter((group) => form.groups.findIndex((groupId) => groupId === group._id) === -1);
  };

  const getGroup = (value) => {
    const index = groupOfThisUser.findIndex((group) => group.name === value);
    if (index === -1) {
      return;
    }

    setGroupSelected(groupOfThisUser[index]);
  };

  const getGroupName = (id) => {
    const index = groupOfThisUser.findIndex((group) => group._id === id);
    if (index !== -1) {
      return groupOfThisUser[index].name;
    }
    return 'N/A';
  };

  const addGroupToList = () => {
    if (groupSelected) {
      setForm({ ...form, groups: [...form.groups, groupSelected._id] });
      setGroupSelected({});
    }
  };

  const removeGroupToAdd = (id) => {
    const { groups } = form;
    setForm({ ...form, groups: groups.filter((groupId) => groupId !== id) });
  };

  console.log('formFromBDD', formFromBDD);
  console.log('form context', form);

  useEffect(() => {
    if (formFromBDD) {
      setForm(formFromBDD);
    }
  }, [formFromBDD]);

  useEffect(() => {
    getGroups();
    if (form.groups.length > 0) {
      setIsOnlyForGroup(true);
    }
  }, [form]);

  const handleChangeGroupChecked = () => {
    if (isOnlyForGroup === false) {
      setIsOnlyForGroup(true);
    } else {
      setIsOnlyForGroup(false);
      setForm({ ...form, groups: [] });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="formTitle"
        label="Entrez le titre du questionnaire"
        variant="outlined"
        value={form.title}
        helperText="Le titre est obligatoire"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <TextField
        id="formDescription"
        label="Entrez une description de votre formulaire"
        variant="outlined"
        value={form.desc}
        helperText="La description est facultative"
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          disabled={isOnlyForGroup}
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
      <FormGroup>
        <FormControlLabel
          disabled={form.isPublic}
          control={
            <Checkbox checked={isOnlyForGroup} onChange={() => handleChangeGroupChecked()} name="réservé aux groupes" />
          }
          label="Réservé aux groupes"
        />
      </FormGroup>
      {isOnlyForGroup ? (
        groupOfThisUser ? (
          <div>
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FormControl>
                <InputLabel id="selectInput-Groups">Choix du groupe</InputLabel>
                <Select
                  labelId="selectInput-Groups"
                  value={groupSelected.name}
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
  return (await Meteor.callAsync('forms.getOne', params.id)) || null;
};
