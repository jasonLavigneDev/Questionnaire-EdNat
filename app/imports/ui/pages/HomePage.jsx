import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const forms = useLoaderData();
  const navigate = useNavigate();

  return (
    <>
      <p>Binvenue dans la nouvelle application</p>
      {user ? (
        <Button onClick={() => navigate('/logout')}>Logout</Button>
      ) : (
        <Button onClick={() => Meteor.loginWithKeycloak()}>Login</Button>
      )}
      <div>
        <h2>Liste des formulaires</h2>
        <div>
          {forms.map((form) => (
            <div>
              <Link to={`/visualizer/${form._id}`}>{form.title}</Link>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const loaderHomePage = async ({ request, params }) => {
  const res = await Meteor.callAsync('forms.getAll');
  return res;
};
