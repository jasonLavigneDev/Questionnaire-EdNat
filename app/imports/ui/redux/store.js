import { configureStore } from '@reduxjs/toolkit';

import answerFormReducer from './slices/answerFormSlice';
import formReducer from './slices/formSlice';
import questionReducer from './slices/questionSlice';

const store = configureStore({
  reducer: {
    answerForm: answerFormReducer,
    form: formReducer,
    question: questionReducer,
    serializableCheck: false,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
