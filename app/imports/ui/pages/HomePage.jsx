import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <p>Binvenue dans la nouvelle application</p>
      <button onClick={() => navigate('/login')}>Se connecter</button>
    </>
  );
};
