import React from 'react';
import { Paper, Tooltip, Typography } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import { InputChoice } from './InputChoice';
import ManageComponents from '../ManageComponents';
import { useSelector } from 'react-redux';

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

  const class3 = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '5vh',
    marginTop: '1vh',
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
              <Paper sx={{ display: 'flex', width: '28vw', marginBottom: 1, border: '1px black solid' }}>
                <div
                  style={{
                    display: 'flex',
                    paddingLeft: '0.5vw',
                    width: '18vw',
                    alignItems: 'center',
                    height: '5vh',
                  }}
                >
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
                    <Tooltip title="la question est required">
                      <Typography sx={{ marginLeft: 0.5 }} color="red" variant="h4">
                        *
                      </Typography>
                    </Tooltip>
                  )}
                  <div></div>
                </div>
                <div className={class3}>
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
