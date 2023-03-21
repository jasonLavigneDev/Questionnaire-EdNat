import React from 'react';
import '../../../../client/styles/spinner.css';

export const Spinner = () => {
  return (
    <div className="spinner-container">
      <img width="250" className="rotate" src="/images/puce_eole.png" alt="loader" />
    </div>
  );
};
