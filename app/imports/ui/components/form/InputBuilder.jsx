import React, { useState, useEffect } from 'react';
import { Paper, Tooltip, Typography, Divider } from '@mui/material';
import i18n from 'meteor/universe:i18n';
import { useDispatch, useSelector } from 'react-redux';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { InputChoice } from './InputChoice';
import ManageComponents from '../ManageComponents';
import { LIST_OF_INPUT_BUILDER } from '../listOfInputBuilder';
import { animate, Reorder, useDragControls, useMotionValue } from 'framer-motion';

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
  // test yo

  const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce'];
  const [items, setItems] = useState(initialItems);

  const classUl = {
    position: 'relative',
    width: '300px',
  };

  const classLi = {
    listStyle: 'none',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    padding: '15px 18px',
    position: 'relative',
    background: 'white',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  };

  const Item = ({ item }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();

    return (
      <Reorder.Item
        className={classLi}
        value={item}
        id={item}
        style={{ boxShadow, y }}
        dragListener={false}
        dragControls={dragControls}
      >
        <ReorderIcon dragControls={dragControls} />
        <span>{item}</span>
      </Reorder.Item>
    );
  };

  const ReorderIcon = ({ dragControls }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 39 39"
        width="39"
        height="39"
        onPointerDown={(event) => dragControls.start(event)}
      >
        <path
          d="M 5 0 C 7.761 0 10 2.239 10 5 C 10 7.761 7.761 10 5 10 C 2.239 10 0 7.761 0 5 C 0 2.239 2.239 0 5 0 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 19 0 C 21.761 0 24 2.239 24 5 C 24 7.761 21.761 10 19 10 C 16.239 10 14 7.761 14 5 C 14 2.239 16.239 0 19 0 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 33 0 C 35.761 0 38 2.239 38 5 C 38 7.761 35.761 10 33 10 C 30.239 10 28 7.761 28 5 C 28 2.239 30.239 0 33 0 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 33 14 C 35.761 14 38 16.239 38 19 C 38 21.761 35.761 24 33 24 C 30.239 24 28 21.761 28 19 C 28 16.239 30.239 14 33 14 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 19 14 C 21.761 14 24 16.239 24 19 C 24 21.761 21.761 24 19 24 C 16.239 24 14 21.761 14 19 C 14 16.239 16.239 14 19 14 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 5 14 C 7.761 14 10 16.239 10 19 C 10 21.761 7.761 24 5 24 C 2.239 24 0 21.761 0 19 C 0 16.239 2.239 14 5 14 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 5 28 C 7.761 28 10 30.239 10 33 C 10 35.761 7.761 38 5 38 C 2.239 38 0 35.761 0 33 C 0 30.239 2.239 28 5 28 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 19 28 C 21.761 28 24 30.239 24 33 C 24 35.761 21.761 38 19 38 C 16.239 38 14 35.761 14 33 C 14 30.239 16.239 28 19 28 Z"
          fill="#CCC"
        ></path>
        <path
          d="M 33 28 C 35.761 28 38 30.239 38 33 C 38 35.761 35.761 38 33 38 C 30.239 38 28 35.761 28 33 C 28 30.239 30.239 28 33 28 Z"
          fill="#CCC"
        ></path>
      </svg>
    );
  };

  function useRaisedShadow(value) {
    const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)';
    const boxShadow = useMotionValue(inactiveShadow);

    useEffect(() => {
      let isActive = false;
      value.onChange((latest) => {
        const wasActive = isActive;
        if (latest !== 0) {
          isActive = true;
          if (isActive !== wasActive) {
            animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)');
          }
        } else {
          isActive = false;
          if (isActive !== wasActive) {
            animate(boxShadow, inactiveShadow);
          }
        }
      });
    }, [value, boxShadow]);

    return boxShadow;
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
            <Reorder.Group axis="y" values={questions} as="div" onReorder={updateQuestionOrder}>
              {questions.map((currentComponent, index) => (
                <Question key={index} currentComponent={currentComponent} index={index} />
              ))}
            </Reorder.Group>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div>test yo</div>
        <Reorder.Group className={classUl} axis="y" onReorder={setItems} values={items}>
          {items.map((item) => (
            <Item key={item} item={item} />
          ))}
        </Reorder.Group>
      </div>
    </>
  );
};
