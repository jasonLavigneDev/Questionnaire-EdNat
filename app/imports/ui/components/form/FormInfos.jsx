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
  const [groupsOfThisUser, setGroupsOfThisUser] = useState([]);
  const [groupSelected, setGroupSelected] = useState({});
  const [isOnlyForGroup, setIsOnlyForGroup] = useState(false); // Remonter cet état au form context

  const { currentForm, setCurrentForm } = useContext(FormContext);

  const formFromBDD = useLoaderData();

  const getUserGroups = async () => {
    Meteor.callAsync('groups.getUserGroups')
      .then((res) => {
        setGroupsOfThisUser(res);
      })
      .catch((err) => {
        console.log('groups.getUserGroups', err.reason);
      });
  };

  const displayGroupsNotSelected = () => {
    return groupsOfThisUser.filter((group) => currentForm.groups.findIndex((groupId) => groupId === group._id) === -1);
  };

  const selectGroup = (value) => {
    const index = groupsOfThisUser.findIndex((group) => group.name === value);
    if (index === -1) {
      return;
    }

    setGroupSelected(groupsOfThisUser[index]);
  };

  const getGroupName = (id) => {
    const index = groupsOfThisUser.findIndex((group) => group._id === id);
    if (index !== -1) {
      return groupsOfThisUser[index].name;
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

  useEffect(() => {
    if (formFromBDD) {
      setCurrentForm(formFromBDD);
    }
  }, [formFromBDD]);

  useEffect(() => {
    getUserGroups();
    if (currentForm.groups.length > 0) {
      setIsOnlyForGroup(true);
    }
  }, [currentForm]);

  const handleIsOnlyForGroup = () => {
    if (isOnlyForGroup === false) {
      setIsOnlyForGroup(true);
    } else {
      setIsOnlyForGroup(false);
      setCurrentForm({ ...currentForm, groups: [] });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id="formTitle"
        label="Entrez le titre du questionnaire"
        variant="outlined"
        value={currentForm.title}
        helperText="Le titre est obligatoire"
        onChange={(e) => setCurrentForm({ ...currentForm, title: e.target.value })}
      />
      <TextField
        id="formDescription"
        label="Entrez une description de votre formulaire"
        variant="outlined"
        value={currentForm.desc}
        helperText="La description est facultative"
        onChange={(e) => setCurrentForm({ ...currentForm, desc: e.target.value })}
      />
      <FormGroup>
        <FormControlLabel
          disabled={isOnlyForGroup}
          control={
            <Checkbox
              checked={currentForm.isPublic}
              onChange={() => setCurrentForm({ ...currentForm, isPublic: !currentForm.isPublic })}
              name="isPublic"
            />
          }
          label="Formulaire public"
        />
      </FormGroup>
      <FormGroup>
        <FormControlLabel
          disabled={currentForm.isPublic}
          control={
            <Checkbox checked={isOnlyForGroup} onChange={() => handleIsOnlyForGroup()} name="réservé aux groupes" />
          }
          label="Réservé aux groupes"
        />
      </FormGroup>
      {isOnlyForGroup ? (
        groupsOfThisUser.length > 0 ? (
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
        )
      ) : null}

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

export const loader = async ({ params }) => {
  return (await Meteor.callAsync('forms.getOneFromUser', params.id)) || null;
};
