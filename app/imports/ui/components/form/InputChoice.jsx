import React from 'react';
import i18n from 'meteor/universe:i18n';
import { FormControl, Select, InputLabel, MenuItem, OutlinedInput, Divider } from '@mui/material';
import { ComponentBuilder } from '../ComponentBuilder';
import { LIST_OF_INPUT_BUILDER } from '../listOfInputBuilder';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestionTypeAndResetChoices } from '../../redux/slices/questionSlice';

export const InputChoice = () => {
  const question = useSelector((state) => state.question);
  const inputType = question.type;
  const dispatch = useDispatch();

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="selectInput-title">{i18n.__('component.inputChoice.questionType')}</InputLabel>
        <Select
          labelId="selectInput-title"
          value={inputType}
          input={<OutlinedInput label={i18n.__('component.inputChoice.questionType')} />}
          onChange={(event) => {
            dispatch(addQuestionTypeAndResetChoices({ type: event.target.value }));
          }}
        >
          {LIST_OF_INPUT_BUILDER.slice(0, -4).map((inputBuilder) => (
            <MenuItem key={inputBuilder.id} value={inputBuilder.id}>
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                {inputBuilder.icon}
                <Divider orientation="vertical" flexItem sx={{ margin: '0 1vw' }} />
                {i18n.__(`component.inputs.${inputBuilder.name}`)}
              </div>
            </MenuItem>
          ))}
          <Divider variant="middle" />
          <h4 style={{ display: 'flex', marginTop: '15px', marginLeft: '0.5vw', marginBottom: '10px' }}>
            {i18n.__(`component.inputs.layout`)}
          </h4>
          {LIST_OF_INPUT_BUILDER.slice(-4).map((inputBuilder) => (
            <MenuItem key={inputBuilder.id} value={inputBuilder.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                }}
              >
                {inputBuilder.icon}
                <Divider orientation="vertical" flexItem sx={{ margin: '0 1vw' }} />
                {i18n.__(`component.inputs.${inputBuilder.name}`)}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {inputType !== '' && (
        <>
          <br />
          <div>
            <ComponentBuilder />
          </div>
        </>
      )}
    </div>
  );
};
