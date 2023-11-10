import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const ReorderIcon = ({ setDraggable }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39 39"
      width="30"
      height="30"
      onMouseEnter={() => setDraggable(true)}
      onMouseLeave={() => setDraggable(false)}
      onTouchStart={() => setDraggable(true)}
      cursor="grab"
    >
      <DragIndicatorIcon sx={{ color: 'rgb(180, 180, 180)' }} />
    </svg>
  );
};
