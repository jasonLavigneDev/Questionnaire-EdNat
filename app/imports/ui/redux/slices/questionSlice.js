import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  answerText: '',
  choices: [],
  id: '',
  type: '',
  answerRequired: false,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    resetQuestionObject: (state, action) => {
      return initialState;
    },
    fillQuestionObject: (state, action) => {
      return action.payload;
    },
    addQuestionText: (state, action) => {
      state.title = action.payload.title;
    },
    addQuestionType: (state, action) => {
      state.type = action.payload.type;
    },
    addAnswerText: (state, action) => {
      state.answerText = action.payload.answerText;
    },
    resetAnswerText: (state, action) => {
      state.answerText = '';
    },
    addAnswerOptions: (state, action) => {
      state.choices.push(action.payload.choices);
    },
    updateIndexAnswerOptions: (state, action) => {
      state.choices = action.payload;
    },
    removeOption: (state, action) => {
      state.choices = state.choices.filter((o) => o !== action.payload.option);
    },
    toggleAnswerIsRequired: (state, action) => {
      state.answerRequired = !state.answerRequired;
    },
  },
});

export const {
  addQuestionText,
  addAnswerText,
  addAnswerOptions,
  removeOption,
  fillQuestionObject,
  resetQuestionObject,
  resetAnswerText,
  addQuestionType,
  toggleAnswerIsRequired,
  updateIndexAnswerOptions,
} = questionSlice.actions;

export default questionSlice.reducer;
