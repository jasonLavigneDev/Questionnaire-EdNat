import React, { useState } from 'react';
import MuiInput from './components/input';
import MuiCheckbox from './components/checkbox';
import MuiSelector from './components/selector';
// import { Modal, Box, Typography, Select, MenuItem, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const FormBuilder = () => {
  // ARRAY OF COMPONENT INPUTS TO DISPLAY
  const components = [
    {
      name: 'component1',
      component: <MuiInput />,
    },
    {
      name: 'component2',
      component: <MuiCheckbox choises={['yes', 'no', 'bite', 'cool']} />,
    },
    {
      name: 'component3',
      component: <MuiSelector />,
    },
  ];

  const [componentInputs, setComponentInputs] = useState(components);

  const addComponentToForm = (componentName) => {
    const componentObj = components.filter((component) => component.name === componentName);
    const newObj = [...componentInputs];
    newObj.push(componentObj[0]);
    setComponentInputs(newObj);
  };

  const removeComponentToForm = (componentId) => {
    const newObj = componentInputs.filter((component) => component.name != componentId);
    setComponentInputs(newObj);
  };

  // SIMULATE AN ADD COMPONENT FROM LIST
  const componentName = 'component2';

  // SIMULATE AN COMPONENT NAME ID TO REMOVE
  const componentIdToRemove = 'component1';

  return (
    <div>
      {componentInputs.map((componentInput) => componentInput.component)}
      <button onClick={() => addComponentToForm(componentName)}>CLICK FOR ADD COMPONENT</button>
      <button onClick={() => removeComponentToForm(componentIdToRemove)}>CLICK FOR REMOVE</button>

      {/* <MuiInput />
      <MuiCheckbox title="test" choises={['yes', 'no', 'bite', 'cool']} />
      <MuiSelector handleClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter un composent
          </Typography>
          <Select value={composent} label="Composent" onChange={handleChange} sx={{ width: '100%' }}>
            <MenuItem value={'checkbox'}>checkbox</MenuItem>
            <MenuItem value={'input'}>input</MenuItem>
            <MenuItem value={'autre'}>autre</MenuItem>
          </Select>
          <Button onClick={handleClose}>Valider</Button>
        </Box>
      </Modal> */}
    </div>
  );
};
