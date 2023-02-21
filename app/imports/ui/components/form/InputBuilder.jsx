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
      <div className="flex row maxHt-100 jc-spaceEven">
        <div className="flex column wd-50pct">
          <h3>{i18n.__('component.inputBuilder.inputType')}</h3>
          {<InputChoice />}
        </div>
        <div className={class1}>
          <h3>{i18n.__('component.inputBuilder.inputOrder')}</h3>
          <div className={class2}>
            {form.components.map((currentComponent, index) => (
              <Paper className="flex wd-28 mb-1 border">
                <div className="flex padl-1 wd-18 ali-center ht-5vh">
                  <p className="maxHt-1p2 overflow-ellipsis">{currentComponent.title}</p>
                  {currentComponent.answerRequired && (
                    <Tooltip title={i18n.__('component.inputBuilder.inputRequired')}>
                      <Typography className="ml-1px" color="red" variant="h4">
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
