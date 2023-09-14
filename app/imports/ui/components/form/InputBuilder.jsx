import React, { useState, useEffect } from 'react';
import { Paper, Tooltip, Typography, Divider } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import { useDispatch, useSelector } from 'react-redux';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { InputChoice } from './InputChoice';
import ManageComponents from '../ManageComponents';
import { LIST_OF_INPUT_BUILDER } from '../listOfInputBuilder';
import { Reorder, useDragControls } from 'framer-motion';

export const InputBuilder = () => {
  const form = useSelector((state) => state.form);
  // const dispatch = useDispatch();

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

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (form.components) {
      setQuestions(form.components);
    }
  }, []);

  const updateQuestionOrder = (lesQuestions) => {
    // dispatch([...form.components]);
    console.log('lesQuestions', lesQuestions);
    setQuestions(lesQuestions);
  };

  function Question({ currentComponent, index }) {
    const controls = useDragControls();

    return (
      <Reorder.Item value={index} dragListener={false} dragControls={controls}>
        <Paper
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
            <div className="reorder-handle" onPointerDown={(e) => controls.start(e)}>
              <DragIndicatorIcon sx={{ color: 'rgb(180, 180, 180)', marginLeft: -1 }} />
            </div>
            {LIST_OF_INPUT_BUILDER.map(
              (inputBuilder) =>
                inputBuilder.id === currentComponent.type && (
                  <div key={inputBuilder.id} style={{ display: 'flex', justifyContent: 'start' }}>
                    <Tooltip title={i18n.__(`component.inputs.${inputBuilder.name}`)}>{inputBuilder.icon}</Tooltip>
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
      </Reorder.Item>
    );
  }

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
            <Reorder.Group values={questions} as="div" onReorder={updateQuestionOrder}>
              {questions.map((currentComponent, index) => (
                <Question key={index} currentComponent={currentComponent} index={index} />
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
    </>
  );
};
