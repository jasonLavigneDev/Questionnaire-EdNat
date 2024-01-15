import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_EXPIRATION_DATE = Meteor.settings.public.defaultFormExpirationDelay || 60;
const DEFAULT_DELETION_DATE = Meteor.settings.public.dataDeletionDelay || 30;

const initialDateForExpiration = new Date();
const initialDateForDeletion = new Date();

const initialState = {
  title: '',
  description: '',
  components: [],
  groups: [],
  isPublic: false,
  owner: '',
  isForGroup: false,
  formId: null,
  formAnswers: [],
  isActive: false,
  editableAnswers: false,
  acceptRGPD: false,
  firstName: '',
  lastName: '',
  expirationDate: new Date(
    initialDateForExpiration.setDate(initialDateForExpiration.getDate() + DEFAULT_EXPIRATION_DATE),
  ),
  dataDeletionDate: new Date(
    initialDateForDeletion.setDate(
      initialDateForDeletion.getDate() + (DEFAULT_EXPIRATION_DATE + DEFAULT_DELETION_DATE),
    ),
  ),
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetFormObject: () => {
      return initialState;
    },
    fillForm: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.components = action.payload.components;
      state.groups = action.payload.groups;
      state.isPublic = action.payload.isPublic;
      state.formId = action.payload._id;
      state.formAnswers = action.payload.formAnswers;
      state.isForGroup = action.payload.groups.length !== 0;
      state.isActive = action.payload.isActive;
      state.owner = action.payload.owner;
      state.editableAnswers = action.payload.editableAnswers;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.expirationDate = action.payload.expirationDate;
      state.dataDeletionDate = action.payload.dataDeletionDate;
    },
    addTitle: (state, action) => {
      state.title = action.payload.title;
    },
    addDesc: (state, action) => {
      state.description = action.payload.description;
    },
    toggleEditableAnswers: (state) => {
      state.editableAnswers = !state.editableAnswers;
    },
    formType: (state, action) => {
      if (action.payload.name === 'private') {
        state.isPublic = false;
        state.isForGroup = false;
      }
      if (action.payload.name === 'public') {
        state.isPublic = true;
        state.isForGroup = false;
      }
      if (action.payload.name === 'group') {
        state.isForGroup = true;
        state.isPublic = false;
      }
      if (state.isForGroup === false) state.groups = [];
    },
    toggleAcceptRGPD: (state, action) => {
      state.acceptRGPD = action.payload.acceptRGPD;
    },
    addGroups: (state, action) => {
      if (!state.groups.includes(action.payload)) state.groups.push(action.payload);
    },
    removeGroup: (state, action) => {
      state.groups = state.groups.filter((groupId) => groupId !== action.payload.id);
    },
    addComponents: (state, action) => {
      state.components.push(action.payload);
    },
    swapPositions: (state, action) => {
      state.components = action.payload;
    },
    updateComponent: (state, action) => {
      const index = state.components.findIndex((component) => component.id === action.payload.id);
      state.components[index] = action.payload;
    },
    removeComponents: (state, action) => {
      state.components = state.components.filter(
        (currentComponent) => currentComponent.id !== action.payload.componentId,
      );
    },
    updateExpirationDate: (state, action) => {
      state.expirationDate = action.payload.expirationDate;

      let deletionDate = new Date(state.expirationDate);
      deletionDate.setDate(deletionDate.getDate() + DEFAULT_DELETION_DATE);
      state.dataDeletionDate = deletionDate;
    },
  },
});

export const {
  fillForm,
  resetFormObject,
  addTitle,
  addComponents,
  swapPositions,
  addGroups,
  removeGroup,
  removeComponents,
  addDesc,
  formType,
  toggleIsForGroup,
  toggleIsPublic,
  toggleEditableAnswers,
  toggleAcceptRGPD,
  updateComponent,
  updateExpirationDate,
} = formSlice.actions;

export default formSlice.reducer;
