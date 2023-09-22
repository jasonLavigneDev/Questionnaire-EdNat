import React from 'react';
import { Typography } from '@mui/material';

export const SectionStart = ({ title }) => {
  return (
    <div
      style={
        {
          //   borderTop: '5px solid #1565C0',
          //   borderLeft: '5px solid #1565C0',
          //   // borderRight: '1px solid black',
          //   borderRadius: '20px / 20px 5px 0 0',
          //   padding: '0 calc(100vw + 20px)',
        }
      }
    >
      <Typography id="sectionStart-title" sx={{ marginTop: '1vh' }} variant="h5">
        {title}
      </Typography>
    </div>
  );
};
