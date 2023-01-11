export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isConnected: (state.isConnected = action.payload),
      };

    default:
      throw new Error();
  }
};
