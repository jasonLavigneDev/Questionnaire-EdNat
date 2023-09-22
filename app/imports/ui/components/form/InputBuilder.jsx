import React from 'react';
import { Paper, Tooltip, Typography, Divider } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import { useSelector } from 'react-redux';
import { InputChoice } from './InputChoice';
import ManageComponents from '../ManageComponents';
import { LIST_OF_INPUT_BUILDER } from '../listOfInputBuilder';

export const InputBuilder = () => {
  const form = useSelector((state) => state.form);

  const class1 = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5vw',
    overflow: 'auto',
    width: '45%',
    maxHeight: '60vh',
  };

  const class2 = {
    overflow: 'auto',
    maxHeight: '60vh',
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', maxHeight: '100%', justifyContent: 'space-evenly' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
          <h3>{i18n.__('component.inputBuilder.inputType')}</h3>
          {<InputChoice />}
        </div>
        <div className={class1}>
          <h3>{i18n.__('component.inputBuilder.inputOrder')}</h3>
          <div className={class2}>
            {form.components.map((currentComponent, index) => (
              <Paper
                key={index}
                sx={{
                  display: 'flex',
                  marginBottom: 1,
                  border: '1px black solid',
                  backgroundColor:
                    currentComponent.type === 'sectionStart'
                      ? 'LightSkyBlue'
                      : currentComponent.type === 'sectionEnd'
                      ? 'SpringGreen'
                      : currentComponent.type === 'separator'
                      ? 'orange'
                      : '',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '18vw',
                    paddingLeft: '0.5vw',
                    alignItems: 'center',
                    height: '5vh',
                  }}
                >
                  {LIST_OF_INPUT_BUILDER.map(
                    (inputBuilder) =>
                      inputBuilder.id === currentComponent.type && (
                        <div key={inputBuilder.id} style={{ display: 'flex', justifyContent: 'start' }}>
                          <Tooltip title={i18n.__(`component.inputs.${inputBuilder.name}`)}>
                            {inputBuilder.icon}
                          </Tooltip>
                          <Divider orientation="vertical" flexItem sx={{ margin: '0 1vw' }} />
                        </div>
                      ),
                  )}
                  <p
                    style={{
                      maxHeight: '1.2rem',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflowY: 'hidden',
                      overflow: 'hidden',
                    }}
                  >
                    {currentComponent.title}
                  </p>
                  {currentComponent.answerRequired && (
                    <Tooltip title={i18n.__('component.inputBuilder.inputRequired')}>
                      <Typography sx={{ marginLeft: 0.5 }} color="red" variant="h4">
                        *
                      </Typography>
                    </Tooltip>
                  )}
                  <div></div>
                </div>
                <div>
                  <ManageComponents currentComponent={currentComponent} index={index} />
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
