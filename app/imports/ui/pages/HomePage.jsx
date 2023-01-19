import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FormContext } from '../contexts/FormContext';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const forms = useLoaderData();
  const navigate = useNavigate();

  const { resetFormContext } = useContext(FormContext);

  useEffect(() => {
    resetFormContext();
  }, []);

  return (
    <>
      <p>Bienvenue dans la nouvelle application</p>
      {user ? (
        <div>
          <Button onClick={() => navigate('/logout')}>Logout</Button>
          <Button onClick={() => navigate('/builder')}>Builder</Button>
        </div>
      ) : (
        <Button onClick={() => Meteor.loginWithKeycloak()}>Login</Button>
      )}
      <div>
        <h2>Liste des formulaires</h2>
        <div>
          {forms.map((form) => (
            <div key={form._id}>
              <Link to={`/visualizer/${form._id}`}>{form.title}</Link>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const loaderHomePage = async () => {
  const res = await Meteor.callAsync('forms.getAll');
  return res;
};
