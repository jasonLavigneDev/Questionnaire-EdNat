import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  formId: '',
  answers: [],
};

export const answerFormSlice = createSlice({
  name: 'answerForm',
  initialState,
  reducers: {
    resetUserAnswerObject: (state, action) => {
      return initialState;
    },
    fillUserAnswersObject: (state, action) => {
      state.userId = action.payload.userId;
      state.formId = action.payload.formId;
      state.answers = action.payload.answers;
    },
    addAnswers: (state, action) => {
      const { questionId, value } = action.payload;
      const index = state.answers.findIndex((answer) => answer.questionId === questionId);

      if (index === -1) {
        state.answers.push({ questionId, answer: value });
      } else {
        state.answers[index].answer = value;
      }
    },
  },
});

export const { addAnswers, fillUserAnswersObject, resetUserAnswerObject } = answerFormSlice.actions;

export default answerFormSlice.reducer;
