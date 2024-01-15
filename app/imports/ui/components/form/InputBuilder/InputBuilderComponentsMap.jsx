import React, { useEffect, useState } from 'react';

import { InputBuilderMap } from './InputBuilderMap';
import { useDispatch, useSelector } from 'react-redux';
import { Reorder } from 'framer-motion';
import { swapPositions } from '../../../redux/slices/formSlice';
import { Paper } from '@mui/material';
import { ManageComponent } from '../../ManageComponents';
import { getPaperStyle } from './utils/getPaperStyle';

export const InputBuilderComponentsMap = () => {
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();

  const [localFormComponents, setLocalFormComponents] = useState(form.components);
  const [draggable, setDraggable] = useState(false);
  useEffect(() => {
    dispatch(swapPositions(localFormComponents));
  }, [localFormComponents]);

  useEffect(() => {
    setLocalFormComponents(form.components);
  }, [form]);

  return (
    <Reorder.Group
      as="div"
      values={localFormComponents}
      onReorder={(newReorder) => {
        setLocalFormComponents(newReorder);
      }}
      style={{ height: '56vh', overflow: 'auto', overflowX: 'unset' }}
    >
      {localFormComponents.map((currentComponent) => (
        <Reorder.Item
          as="div"
          drag={(draggable, 'y')}
          key={currentComponent.id}
          value={currentComponent}
          style={{ cursor: 'grab', backgroundColor: 'white' }}
        >
          <Paper sx={getPaperStyle(currentComponent)}>
            <InputBuilderMap currentComponent={currentComponent} />
            <ManageComponent currentComponent={currentComponent} setDraggable={setDraggable} />
          </Paper>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
