import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Meteor.logout(() => {
      navigate('/login');
    });
  }, []);

  return null;
};
