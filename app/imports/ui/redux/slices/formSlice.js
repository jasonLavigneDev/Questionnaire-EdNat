import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  desc: '',
  components: [],
  groups: [],
  isPublic: false,
  isForGroup: false,
  formId: null,
  formAnswers: [],
  isActive: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetFormObject: (state, action) => {
      return initialState;
    },
    fillForm: (state, action) => {
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.components = action.payload.components;
      state.groups = action.payload.groups;
      state.isPublic = action.payload.isPublic;
      state.formId = action.payload.formId;
      state.formAnswers = action.payload.formAnswers;
      state.isForGroup = action.payload.onlyGroup || false;
      state.isActive = action.payload.isActive;
    },
    addTitle: (state, action) => {
      state.title = action.payload.title;
    },
    addDesc: (state, action) => {
      state.desc = action.payload.desc;
    },
    toggleIsPublic: (state, action) => {
      state.isPublic = !state.isPublic;
    },
    toggleIsForGroup: (state, action) => {
      state.isForGroup = !state.isForGroup;
      if (state.isForGroup === false) {
        state.groups = [];
      }
    },
    addGroups: (state, action) => {
      state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter((groupId) => groupId !== action.payload.id);
    },
    addComponents: (state, action) => {
      state.components.push(action.payload);
    },
    removeComponents: (state, action) => {
      state.components = state.components.filter(
        (currentComponent) => currentComponent.id !== action.payload.componentId,
      );
    },
  },
});

export const {
  fillForm,
  resetFormObject,
  addTitle,
  addComponents,
  addGroups,
  removeGroup,
  removeComponents,
  addDesc,
  toggleIsForGroup,
  toggleIsPublic,
} = formSlice.actions;

export default formSlice.reducer;
